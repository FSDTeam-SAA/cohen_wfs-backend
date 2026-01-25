import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { ContactController } from './contact.controller.js';
import { ContactValidation } from './contact.validation.js';
import { RateLimiter } from '../../middlewares/rateLimiter.js';
const router = express.Router();
router.post('/us', RateLimiter.contactLimiter, validateRequest(ContactValidation.createContactZodSchema), ContactController.createContact);
export const ContactRoutes = router;
//# sourceMappingURL=contact.router.js.map