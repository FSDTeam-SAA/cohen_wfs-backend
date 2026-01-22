import { Schema, model } from 'mongoose';

const enquirySchema = new Schema({
    enquiryId: { type: String, unique: true }, // e.g., ENQ-2026-001
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    companyName: { type: String },
    enquiryType: {
        type: String,
        enum: ['Purchase', 'Partnership', 'Information', 'Distribution'],
        required: true
    },
    productInterest: {
        type: String,
        enum: ['Potatoes', 'Carrots', 'Livestock', 'Multiple Product'],
        required: true
    },
    location: { type: String, required: true },
    volumeRequired: { type: String },
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ['New', 'In-Progress', 'Follow-up Required', 'Completed'],
        default: 'New'
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    }
}, { timestamps: true });

// Auto-generate Enquiry ID before saving
enquirySchema.pre('save', async function (this: any) {
    if (!this.enquiryId) {
        const count = await model('Enquiry').countDocuments();
        const year = new Date().getFullYear();
        this.enquiryId = `ENQ-${year}-${String(count + 1).padStart(3, '0')}`;
    }
});

export const Enquiry = model('Enquiry', enquirySchema);