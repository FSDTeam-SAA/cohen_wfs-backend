import { Schema } from 'mongoose';
export declare const Enquiry: import("mongoose").Model<{
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
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
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
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
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
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
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
}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & Omit<{
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
}, {
    [path: string]: import("mongoose").SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: import("mongoose").SchemaDefinitionProperty<any, any, import("mongoose").Document<unknown, {}, {
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
    }, import("mongoose").ResolveSchemaOptions<{
        timestamps: true;
    }>> & Omit<{
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
    }> | undefined;
}, {
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
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
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
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
