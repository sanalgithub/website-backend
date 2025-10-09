import Contact, { ContactUsDocument } from "../../models/contactUsModel";

export const createContact = async (
  contactData: Partial<ContactUsDocument>,
): Promise<ContactUsDocument> => {
  const contact = new Contact(contactData);
  return await contact.save();
};
