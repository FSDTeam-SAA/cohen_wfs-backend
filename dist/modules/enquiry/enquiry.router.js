import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { USER_ROLE } from '../user/user.constant.js';
import { EnquiryValidation } from './enquiry.validation.js';
import { EnquiryController } from './enquiry.controller.js';
import Auth from '../../middlewares/Auth.js';
import { RateLimiter } from '../../middlewares/rateLimiter.js';
const router = express.Router();
/**
 * PUBLIC ROUTE
 * Allows buyers, distributors, and partners to submit enquiries [cite: 49]
 */
router.post('/us', RateLimiter.enquiryRateLimiter, validateRequest(EnquiryValidation.createEnquiryZodSchema), EnquiryController.createEnquiry);
/**
 * PROTECTED ADMIN ROUTES
 * Only accessible by Admin to manage submissions and view dashboard analytics [cite: 62, 64]
 */
router.get('/get-all-enquiries', Auth(USER_ROLE.ADMIN), EnquiryController.getAllEnquiries);
router.get('/stats', Auth(USER_ROLE.ADMIN), EnquiryController.getEnquiryStats);
router.get('/export', Auth(USER_ROLE.ADMIN), // Protect business data
EnquiryController.exportEnquiries);
router.delete('/:enquiryId', Auth(USER_ROLE.ADMIN), EnquiryController.delteEnquiry);
router.patch('/:enquiryId/status', Auth(USER_ROLE.ADMIN), EnquiryController.updateEnquirystatus);
router.get('/:enquiryId', Auth(USER_ROLE.ADMIN), EnquiryController.getSingleEnquiry);
export const EnquiryRoutes = router;
//# sourceMappingURL=enquiry.router.js.map