import express from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import { UserValidation } from './user.validation.js';
import { UserController } from './user.controller.js';
const router = express.Router();
router.post('/create-account', validateRequest(UserValidation.createAccountValidationSchema), UserController.createAccount);
export const UserRoutes = router;
//# sourceMappingURL=user.router.js.map