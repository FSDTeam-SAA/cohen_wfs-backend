import mongoose, { Schema, model } from 'mongoose';

const enquirySchema = new Schema({
    enquiryId: { type: String, unique: true }, // e.g., ENQ-2026-001
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    companyName: { type: String },
    enquiryType: {
        type: String,
        enum: ['Purchase', 'Buyer Enquiry', 'Supplier Enquiry'],
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
// enquirySchema.pre('save', async function (this: any) {
//     if (!this.enquiryId) {
//         const count = await model('Enquiry').countDocuments();
//         const year = new Date().getFullYear();
//         this.enquiryId = `ENQ-${year}-${String(count + 1).padStart(3, '0')}`;
//     }
// });

// enquirySchema.pre('save', async function (this: any) {
//     // Only generate an ID if one doesn't exist
//     if (!this.enquiryId) {
//         const year = new Date().getFullYear();

//         // 1. DYNAMIC CHECK: Find the highest ID
//         const lastEnquiry = await mongoose.model('Enquiry').findOne(
//             { enquiryId: { $regex: `^ENQ-${year}` } },
//             { enquiryId: 1 }
//         ).sort({ enquiryId: -1 });

//         let newIdNumber = 1;

//         if (lastEnquiry && lastEnquiry.enquiryId) {
//             const parts = lastEnquiry.enquiryId.split('-'); // ["ENQ", "2026", "006"]
//             // Check if parts exist to prevent crashes on malformed IDs
//             if (parts.length === 3) {
//                 const lastNumber = parseInt(parts[2], 10);
//                 newIdNumber = lastNumber + 1;
//             }
//         }

//         // 4. Generate "ENQ-2026-007"
//         this.enquiryId = `ENQ-${year}-${String(newIdNumber).padStart(3, '0')}`;
//     }

//     // No next() needed in async functions!
// });

enquirySchema.pre('save', async function (this: any) {
    // Only generate an ID if it's a new document and doesn't have an ID yet
    if (this.isNew && !this.enquiryId) {
        const currentYear = new Date().getFullYear();

        /**
         * 1. DYNAMIC FETCH
         * We look for the latest enquiry created IN THE CURRENT YEAR.
         * This ensures that when 2027 starts, the ID resets to ENQ-2027-001.
         */
        const lastEnquiry = await mongoose.model('Enquiry').findOne(
            {
                enquiryId: { $regex: `^ENQ-${currentYear}-` }
            },
            { enquiryId: 1 },
            { sort: { enquiryId: -1 } } // Get the absolute highest ID
        );

        let newIdNumber = 1;

        if (lastEnquiry && lastEnquiry.enquiryId) {
            // 2. DYNAMIC EXTRACTION
            // Split "ENQ-2026-006" into ["ENQ", "2026", "006"]
            const parts = lastEnquiry.enquiryId.split('-');

            if (parts.length === 3) {
                const lastNumber = parseInt(parts[2], 10);
                // Increment the numeric part
                newIdNumber = lastNumber + 1;
            }
        }

        // 3. DYNAMIC PADDING
        // Generates "ENQ-2026-007"
        this.enquiryId = `ENQ-${currentYear}-${String(newIdNumber).padStart(3, '0')}`;
    }
});

export const Enquiry = model('Enquiry', enquirySchema);