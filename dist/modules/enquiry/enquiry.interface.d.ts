export type TEnquiryType = 'Purchase' | 'Buyer Enquiry' | 'Supplier Enquiry';
export type TProductInterest = 'Potatoes' | 'Carrots' | 'Livestock' | 'Multiple Product';
export type TEnquiryStatus = 'New' | 'In Progress' | 'Follow-up Required' | 'Completed';
export type TPriority = 'High' | 'Medium' | 'Low';
export interface TEnquiry {
    enquiryId?: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    enquiryType: TEnquiryType;
    productInterest: TProductInterest;
    location: string;
    volumeRequired?: string;
    message: string;
    status?: TEnquiryStatus;
    priority?: TPriority;
}
