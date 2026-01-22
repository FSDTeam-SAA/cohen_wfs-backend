import { jest, describe, beforeAll, afterAll, it, expect } from '@jest/globals';

// 1. MOCK EMAIL - This stops the Nodemailer background logging
// Replace '../../utils/sendEmail.js' with your actual email utility path
jest.unstable_mockModule('../../utils/sendEmail.js', () => ({
    sendEmail: jest.fn<() => Promise<boolean>>().mockResolvedValue(true)
}));

// 2. MOCK AUTH
jest.unstable_mockModule('../../middlewares/Auth.js', () => ({
    default: () => (req: any, res: any, next: any) => {
        req.user = { id: 'test-admin-id', role: 'admin' };
        next();
    }
}));

import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Enquiry } from './enquiry.model.js';

// Import app dynamically so mocks are applied
const { default: app } = await import('../../app.js');

describe('Enquiry Module E2E Tests', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe('POST /api/v1/enquiry/us', () => {
        it('should create a new enquiry and return 201', async () => {
            const payload = {
                fullName: "Nayem Sarkar",
                email: "nayem@test.com",
                phoneNumber: "01700000000",
                companyName: "Nayem Corp",
                location: "Dhaka",
                enquiryType: "Purchase",
                productInterest: "Potatoes",
                message: "Interested in bulk purchase",
                priority: "High"
            };

            const res = await request(app)
                .post('/api/v1/enquiry/us')
                .send(payload);

            expect(res.statusCode).toBe(201);
            expect(res.body.data).toHaveProperty('enquiryId');
        });
    });

    describe('GET /api/v1/enquiry/get-all-enquiries', () => {
        it('should return paginated results', async () => {
            // Seed data with all required Zod fields
            await Enquiry.create({
                fullName: "Search Test User",
                email: "search@test.com",
                phoneNumber: "01800000000",
                companyName: "Test Co",
                location: "Test Location",
                enquiryType: "Information",
                productInterest: "Carrots",
                message: "Testing search functionality"
            });

            const res = await request(app)
                .get('/api/v1/enquiry/get-all-enquiries?searchTerm=Search');

            expect(res.statusCode).toBe(200);
            
            // Checks if data is an array or contains a result array (common in QueryBuilders)
            const data = res.body.data;
            const isArray = Array.isArray(data) || (data && Array.isArray(data.result));
            expect(isArray).toBe(true);
        });
    });

    describe('GET /api/v1/enquiry/export', () => {
        it('should download a CSV file', async () => {
            const res = await request(app).get('/api/v1/enquiry/export');
            
            expect(res.statusCode).toBe(200);
            expect(res.header['content-type']).toContain('text/csv');
            expect(res.header['content-disposition']).toContain('attachment');
        });
    });
});