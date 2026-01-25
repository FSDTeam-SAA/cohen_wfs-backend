export interface TContact {
    fullName: string;
    email: string;
    phoneNumber?: string;
    companyName?: string;
    location: string;
    message: string;
    category: 'Enquiry' | 'Contact Us';
}
