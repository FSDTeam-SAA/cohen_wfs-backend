import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import { ContactService } from './contact.service.js';
const createContact = catchAsync(async (req, res) => {
    const result = await ContactService.createContact(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Your message has been sent successfully! Our team will get back to you soon.',
        data: result,
    });
});
export const ContactController = {
    createContact,
};
//# sourceMappingURL=contact.controller.js.map