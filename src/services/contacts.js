import { Contact } from '../models/contacts.js';

export async function getAllContacts(req, res) {
  try {
    const contacts = await Contact.find();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}

export async function getContactById(req, res) {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}
