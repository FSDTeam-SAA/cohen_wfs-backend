import { z } from 'zod';
export declare const EnquiryValidation: {
    createEnquiryZodSchema: z.ZodObject<{
        body: z.ZodObject<{
            fullName: z.ZodString;
            email: z.ZodString;
            phoneNumber: z.ZodString;
            companyName: z.ZodString;
            enquiryType: z.ZodEnum<{
                Purchase: "Purchase";
                Partnership: "Partnership";
                Information: "Information";
                Distribution: "Distribution";
            }>;
            productInterest: z.ZodEnum<{
                Potatoes: "Potatoes";
                Carrots: "Carrots";
                Livestock: "Livestock";
            }>;
            location: z.ZodString;
            message: z.ZodString;
            volumeRequired: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
