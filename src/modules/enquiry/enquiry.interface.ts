export type TEnquiryType = 'Purchase' | 'Buyer Enquiry' | 'Supplier Enquiry';
export type TProductInterest = 'Potatoes' | 'Carrots' | 'Livestock' | 'Multiple Product';
export type TEnquiryStatus = 'New' | 'In-Progress' | 'Follow-up Required' | 'Completed';
export type TPriority = 'High' | 'Medium' | 'Low';

export interface TEnquiry {
    enquiryId?: string; // Auto-generated: e.g., ENQ-2026-001
    fullName: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    enquiryType: TEnquiryType;
    productInterest: TProductInterest;
    location: string;
    volumeRequired?: string; // Captured for sales logistics
    message: string;
    status?: TEnquiryStatus;
    priority?: TPriority;
}