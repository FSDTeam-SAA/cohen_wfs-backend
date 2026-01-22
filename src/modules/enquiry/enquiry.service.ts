import { StatusCodes } from 'http-status-codes';
import config from '../../config/index.js';
import AppError from '../../errors/AppError.js';
import { emailTemplates } from '../../utils/emailTemplates.js';
import sendEmail from '../../utils/sendEmail.js';
import { Enquiry } from './enquiry.model.js';
import { Parser } from 'json2csv';

const createEnquiryIntoDb = async (payload: any) => {

    const existingEnquiry = await Enquiry.findOne({
        email: payload.email,
        productInterest: payload.productInterest,
        message: payload.message,
        // Optional: Only block if created within the last 24 hours
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (existingEnquiry) {
        throw new AppError(
            StatusCodes.CONFLICT,
            "You have already submitted this enquiry. Our team is reviewing it!"
        );
    }


    // 1. Priority Business Rule
    if (payload.enquiryType === 'Purchase') {
        payload.priority = 'High';
    }

    // 2. Save to Database
    const result = await Enquiry.create(payload);

    // 3. Trigger Admin Notification (Async)
    // We don't use 'await' here so the user doesn't wait for the email to finish
    sendEmail({
        to: config.email.adminEmailAddress as string, // Your admin email
        subject: `🚨 New Enquiry: ${result.productInterest} - ${result.enquiryId}`,
        html: emailTemplates.enquiryNotification(result)
    }).catch(err => console.error("Admin Email Notification Failed:", err));

    return result;
};

// This feeds your Dashboard Overview cards (Potatoes: 4, Carrots: 3, etc.)
const getDashboardStatsFromDb = async () => {
    return await Enquiry.aggregate([
        { $group: { _id: "$productInterest", count: { $sum: 1 } } }
    ]);
};

// Feeds the "Recent Enquiries" table
const getAllEnquiriesFromDb = async (query: Record<string, unknown>) => {
    // 1. SEARCH LOGIC (Matches the search bar in your UI)
    let searchTerm = '';
    if (query?.searchTerm) {
        searchTerm = query.searchTerm as string;
    }

    // Fields visible in your table that should be searchable
    const searchableFields = ['enquiryId', 'companyName', 'fullName', 'email', 'contactNumber'];

    const searchQuery = Enquiry.find({
        $or: searchableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: 'i' },
        })),
    });

    // 2. FILTER LOGIC (Matches the dropdowns: Status, Product, Priority)
    const queryObj = { ...query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    const filterQuery = searchQuery.find(queryObj);

    // 3. PAGINATION & SORTING
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const result = await filterQuery
        .sort('-createdAt')
        .skip(skip)
        .limit(limit);

    const total = await Enquiry.countDocuments(queryObj);

    return {
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
        data: result,
    };
};

const getEnquiryStatsFromDb = async () => {
    const stats = await Enquiry.aggregate([
        {
            // 1. Group by product type and count them
            $group: {
                _id: '$productInterest',
                count: { $sum: 1 },
            },
        },
        {
            // 2. Format the output for the frontend
            $project: {
                product: '$_id',
                count: 1,
                _id: 0,
            },
        },
    ]);

    // 3. Fetch summary metrics for the top-row cards
    const totalEnquiries = await Enquiry.countDocuments();
    const highPriorityCount = await Enquiry.countDocuments({ priority: 'High' });
    const newEnquiriesCount = await Enquiry.countDocuments({ status: 'New' });

    return {
        productStats: stats, // Array of { product: "Potatoes", count: 4 }
        totalEnquiries,
        highPriorityCount,
        newEnquiriesCount,
    };
};


const exportEnquiriesToCSVFromDb = async () => {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    // Define the headers based on your Dashboard table screenshots
    const fields = [
        { label: 'Enquiry ID', value: 'enquiryId' },
        { label: 'Date', value: (row: any) => new Date(row.createdAt).toLocaleDateString() },
        { label: 'Company', value: 'companyName' },
        { label: 'Contact Name', value: 'fullName' },
        { label: 'Email', value: 'email' },
        { label: 'Product', value: 'productInterest' },
        { label: 'Type', value: 'enquiryType' },
        { label: 'Status', value: 'status' },
        { label: 'Priority', value: 'priority' }
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(enquiries);

    return csv;
};

const updateEnquiryStatusIntoDb = async (enquiryId: string, status: string) => {
    const result = await Enquiry.findByIdAndUpdate(
        enquiryId,
        { status },
        { new: true, runValidators: true }
    );
    if (!result) throw new AppError(StatusCodes.NOT_FOUND, "Enquiry not found");
    return result;
};

const deleteEnquiryFromDb = async (enquiryId: string) => {
    const result = await Enquiry.findByIdAndDelete(enquiryId);
    if (!result) throw new AppError(StatusCodes.NOT_FOUND, "Enquiry not found");
    return result;
};

const getSingleEnquiryFromDb = async (enquiryId: string) => {
    const result = await Enquiry.findById(enquiryId);
    if (!result) throw new AppError(StatusCodes.NOT_FOUND, "Enquiry not found");
    return result;
};



export const EnquiryService = {
    createEnquiryIntoDb,
    updateEnquiryStatusIntoDb,
    deleteEnquiryFromDb,
    getDashboardStatsFromDb,
    getAllEnquiriesFromDb,
    getEnquiryStatsFromDb,
    exportEnquiriesToCSVFromDb,
    getSingleEnquiryFromDb
};