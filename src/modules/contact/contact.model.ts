

import { Schema, model } from 'mongoose';
import { TContact } from './contact.interface.js';

const contactSchema = new Schema<TContact>(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String },
        companyName: { type: String },
        location: { type: String, required: true },
        message: { type: String, required: true },
        category: { type: String, enum: ['Enquiry', 'Contact Us'], required: true },
    },
    { timestamps: true }
);

export const Contact = model<TContact>('Contact', contactSchema);