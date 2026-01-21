import sendEmail from '../../utils/sendEmail.js';
import { TContact } from './contact.interface.js';
import { Contact } from './contact.model.js';


const createContact = async (payload: TContact) => {
  // 1. Save to Database
  const result = await Contact.create(payload);

  // 2. Prepare Email for Admin
  const adminHtml = `
    <h3>New Contact Form Submission</h3>
    <p><b>Category:</b> ${payload.category}</p>
    <p><b>Name:</b> ${payload.fullName}</p>
    <p><b>Email:</b> ${payload.email}</p>
    <p><b>Phone:</b> ${payload.phoneNumber || 'N/A'}</p>
    <p><b>Location:</b> ${payload.location}</p>
    <p><b>Company:</b> ${payload.companyName || 'N/A'}</p>
    <p><b>Message:</b> ${payload.message}</p>
  `;

  await sendEmail({
    to: 'sarkarnayem955@gmail.com',
    subject: `New ${payload.category} from ${payload.fullName}`,
    html: adminHtml,
  });

  return result;
};

export const ContactService = { createContact };