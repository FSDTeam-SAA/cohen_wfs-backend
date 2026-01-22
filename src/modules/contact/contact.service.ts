import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError.js';
import { emailTemplates } from '../../utils/emailTemplates.js';
import sendEmail from '../../utils/sendEmail.js';
import { TContact } from './contact.interface.js';
import { Contact } from './contact.model.js';


const createContact = async (payload: TContact) => {

  const existingContact = await Contact.findOne({ email: payload.email });

  if(existingContact){
    throw new AppError(StatusCodes.BAD_REQUEST, 'Contact already exists');
  }
  // 1. Save to Database
  const result = await Contact.create(payload);

  // 2. Send Admin Notification (Internal)
  const adminHtml = emailTemplates.enquiryNotification(result);
  await sendEmail({
    to: 'sarkarnayem955@gmail.com', // Your Admin Email
    subject: `New ${payload.category} from ${payload.fullName}`,
    html: adminHtml,
  });

  // 3. Send Customer Acknowledgement (Auto-Responder)
  const customerHtml = emailTemplates.customerAcknowledgement(payload.fullName);
  await sendEmail({
    to: payload.email, // The Email the customer entered in the form
    subject: `We've received your request - Witklip Agriculture`,
    html: customerHtml,
  });

  return result;
};

export const ContactService = { createContact };