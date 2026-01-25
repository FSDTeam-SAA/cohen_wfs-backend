export declare const EnquiryService: {
    createEnquiryIntoDb: (payload: any) => Promise<import("mongoose").Document<unknown, {}, {
        message: string;
        email: string;
        status: "New" | "In-Progress" | "Follow-up Required" | "Completed";
        priority: "High" | "Medium" | "Low";
        fullName: string;
        location: string;
        enquiryType: "Purchase" | "Partnership" | "Information" | "Distribution";
        productInterest: "Potatoes" | "Carrots" | "Livestock" | "Multiple Product";
        phoneNumber?: string | null;
        companyName?: string | null;
        volumeRequired?: string | null;
        enquiryId?: string | null;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        message: string;
        email: string;
        status: "New" | "In-Progress" | "Follow-up Required" | "Completed";
        priority: "High" | "Medium" | "Low";
        fullName: string;
        location: string;
        enquiryType: "Purchase" | "Partnership" | "Information" | "Distribution";
        productInterest: "Potatoes" | "Carrots" | "Livestock" | "Multiple Product";
        phoneNumber?: string | null;
        companyName?: string | null;
        volumeRequired?: string | null;
        enquiryId?: string | null;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    updateEnquiryStatusIntoDb: (enquiryId: string, status: string) => Promise<import("mongoose").Document<unknown, {}, {
        message: string;
        email: string;
        status: "New" | "In-Progress" | "Follow-up Required" | "Completed";
        priority: "High" | "Medium" | "Low";
        fullName: string;
        location: string;
        enquiryType: "Purchase" | "Partnership" | "Information" | "Distribution";
        productInterest: "Potatoes" | "Carrots" | "Livestock" | "Multiple Product";
        phoneNumber?: string | null;
        companyName?: string | null;
        volumeRequired?: string | null;
        enquiryId?: string | null;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        message: string;
        email: string;
        status: "New" | "In-Progress" | "Follow-up Required" | "Completed";
        priority: "High" | "Medium" | "Low";
        fullName: string;
        location: string;
        enquiryType: "Purchase" | "Partnership" | "Information" | "Distribution";
        productInterest: "Potatoes" | "Carrots" | "Livestock" | "Multiple Product";
        phoneNumber?: string | null;
        companyName?: string | null;
        volumeRequired?: string | null;
        enquiryId?: string | null;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    deleteEnquiryFromDb: (enquiryId: string) => Promise<import("mongoose").Document<unknown, {}, {
        message: string;
        email: string;
        status: "New" | "In-Progress" | "Follow-up Required" | "Completed";
        priority: "High" | "Medium" | "Low";
        fullName: string;
        location: string;
        enquiryType: "Purchase" | "Partnership" | "Information" | "Distribution";
        productInterest: "Potatoes" | "Carrots" | "Livestock" | "Multiple Product";
        phoneNumber?: string | null;
        companyName?: string | null;
        volumeRequired?: string | null;
        enquiryId?: string | null;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        message: string;
        email: string;
        status: "New" | "In-Progress" | "Follow-up Required" | "Completed";
        priority: "High" | "Medium" | "Low";
        fullName: string;
        location: string;
        enquiryType: "Purchase" | "Partnership" | "Information" | "Distribution";
        productInterest: "Potatoes" | "Carrots" | "Livestock" | "Multiple Product";
        phoneNumber?: string | null;
        companyName?: string | null;
        volumeRequired?: string | null;
        enquiryId?: string | null;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    getDashboardStatsFromDb: () => Promise<any[]>;
    getAllEnquiriesFromDb: (query: Record<string, unknown>) => Promise<{
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: (import("mongoose").Document<unknown, {}, {
            message: string;
            email: string;
            status: "New" | "In-Progress" | "Follow-up Required" | "Completed";
            priority: "High" | "Medium" | "Low";
            fullName: string;
            location: string;
            enquiryType: "Purchase" | "Partnership" | "Information" | "Distribution";
            productInterest: "Potatoes" | "Carrots" | "Livestock" | "Multiple Product";
            phoneNumber?: string | null;
            companyName?: string | null;
            volumeRequired?: string | null;
            enquiryId?: string | null;
        } & import("mongoose").DefaultTimestampProps, {
            id: string;
        }, {
            timestamps: true;
        }> & Omit<{
            message: string;
            email: string;
            status: "New" | "In-Progress" | "Follow-up Required" | "Completed";
            priority: "High" | "Medium" | "Low";
            fullName: string;
            location: string;
            enquiryType: "Purchase" | "Partnership" | "Information" | "Distribution";
            productInterest: "Potatoes" | "Carrots" | "Livestock" | "Multiple Product";
            phoneNumber?: string | null;
            companyName?: string | null;
            volumeRequired?: string | null;
            enquiryId?: string | null;
        } & import("mongoose").DefaultTimestampProps & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, "id"> & {
            id: string;
        })[];
    }>;
    getEnquiryStatsFromDb: () => Promise<{
        productStats: any[];
        totalEnquiries: number;
        highPriorityCount: number;
        newEnquiriesCount: number;
    }>;
    exportEnquiriesToCSVFromDb: () => Promise<string>;
    getSingleEnquiryFromDb: (enquiryId: string) => Promise<import("mongoose").Document<unknown, {}, {
        message: string;
        email: string;
        status: "New" | "In-Progress" | "Follow-up Required" | "Completed";
        priority: "High" | "Medium" | "Low";
        fullName: string;
        location: string;
        enquiryType: "Purchase" | "Partnership" | "Information" | "Distribution";
        productInterest: "Potatoes" | "Carrots" | "Livestock" | "Multiple Product";
        phoneNumber?: string | null;
        companyName?: string | null;
        volumeRequired?: string | null;
        enquiryId?: string | null;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        message: string;
        email: string;
        status: "New" | "In-Progress" | "Follow-up Required" | "Completed";
        priority: "High" | "Medium" | "Low";
        fullName: string;
        location: string;
        enquiryType: "Purchase" | "Partnership" | "Information" | "Distribution";
        productInterest: "Potatoes" | "Carrots" | "Livestock" | "Multiple Product";
        phoneNumber?: string | null;
        companyName?: string | null;
        volumeRequired?: string | null;
        enquiryId?: string | null;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
};
