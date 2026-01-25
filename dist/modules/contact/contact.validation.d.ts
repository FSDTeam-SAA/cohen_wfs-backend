import z from "zod";
export declare const ContactValidation: {
    createContactZodSchema: z.ZodObject<{
        body: z.ZodObject<{
            fullName: z.ZodString;
            email: z.ZodString;
            phoneNumber: z.ZodOptional<z.ZodString>;
            companyName: z.ZodOptional<z.ZodString>;
            location: z.ZodString;
            message: z.ZodString;
            category: z.ZodEnum<{
                Enquiry: "Enquiry";
                "Contact Us": "Contact Us";
            }>;
        }, z.z.core.$strip>;
    }, z.z.core.$strip>;
};
