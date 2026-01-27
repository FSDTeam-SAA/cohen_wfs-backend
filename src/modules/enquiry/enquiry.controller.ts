import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { EnquiryService } from './enquiry.service.js';


const createEnquiry = catchAsync(async (req: Request, res: Response) => {
    const result = await EnquiryService.createEnquiryIntoDb(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Enquiry submitted successfully. Confirmation sent.',
        data: result,
    });
});

const getAllEnquiries = catchAsync(async (req: Request, res: Response) => {
    const result = await EnquiryService.getAllEnquiriesFromDb(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Enquiries retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

const getEnquiryStats = catchAsync(async (req: Request, res: Response) => {
    const result = await EnquiryService.getEnquiryStatsFromDb();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Dashboard statistics retrieved successfully',
        data: result,
    });
});




const exportEnquiries = catchAsync(async (req: Request, res: Response) => {
    const csvData = await EnquiryService.exportEnquiriesToCSVFromDb();

    // Setting headers for file download
    const fileName = `enquiries-${new Date().toISOString().split('T')[0]}.csv`;

    res.header('Content-Type', 'text/csv');
    res.attachment(fileName); // Shortcut for Content-Disposition: attachment

    return res.status(StatusCodes.OK).send(csvData);
});


const delteEnquiry = catchAsync(async (req: Request, res: Response) => {
    const { enquiryId } = req.params;

    if (!enquiryId || typeof enquiryId !== 'string') {
        return sendResponse(res, {
            statusCode: StatusCodes.BAD_REQUEST,
            success: false,
            message: 'Invalid enquiryId',
        });
    }

    const result = await EnquiryService.deleteEnquiryFromDb(enquiryId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Enquiry deleted successfully',
        data: result,
    });
})

const updateEnquirystatus = catchAsync(async (req: Request, res: Response) => {
    const { enquiryId } = req.params;

    if (!enquiryId || typeof enquiryId !== 'string') {
        return sendResponse(res, {
            statusCode: StatusCodes.BAD_REQUEST,
            success: false,
            message: 'Invalid enquiryId',
        });
    }

    const result = await EnquiryService.updateEnquiryStatusIntoDb(enquiryId, req.body.status);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Enquiry status updated successfully',
        data: result,
    });
})

const getSingleEnquiry = catchAsync(async (req: Request, res: Response) => {
    const { enquiryId } = req.params;

    if (!enquiryId || typeof enquiryId !== 'string') {
        return sendResponse(res, {
            statusCode: StatusCodes.BAD_REQUEST,
            success: false,
            message: 'Invalid enquiryId',
        });
    }

    const result = await EnquiryService.getSingleEnquiryFromDb(enquiryId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Enquiry retrieved successfully',
        data: result,
    });
})


export const EnquiryController = {
    createEnquiry,
    getAllEnquiries,
    getEnquiryStats,
    exportEnquiries,
    delteEnquiry,
    updateEnquirystatus,
    getSingleEnquiry

};