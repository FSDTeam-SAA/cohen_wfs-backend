import { z } from 'zod';
const createEnquiryZodSchema = z.object({
    body: z.object({
        fullName: z.string(),
        email: z.string().email(),
        phoneNumber: z.string(),
        companyName: z.string(),
        enquiryType: z.enum(['Purchase', 'Partnership', 'Information', 'Distribution']),
        productInterest: z.enum(['Potatoes', 'Carrots', 'Livestock']),
        location: z.string(),
        message: z.string(),
        volumeRequired: z.string().optional(),
    })
});
export const EnquiryValidation = {
    createEnquiryZodSchema,
};
//# sourceMappingURL=enquiry.validation.js.map