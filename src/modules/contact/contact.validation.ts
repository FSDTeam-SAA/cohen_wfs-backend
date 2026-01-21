import z from "zod";

const createContactZodSchema = z.object({
  body: z.object({
    fullName: z.string({ message: 'Full name is required' }),
    email: z.string().email('Invalid email address'),
    phoneNumber: z.string().optional(),
    companyName: z.string().optional(),
    location: z.string({ message: 'Location is required' }),
    message: z.string({ message: 'Message is required' }),
    category: z.enum(['Enquiry', 'Contact Us']),
  }),
});

export const ContactValidation = {
  createContactZodSchema,
};