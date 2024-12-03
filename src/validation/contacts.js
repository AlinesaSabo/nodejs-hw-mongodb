import Joi from 'joi';

export const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email(),
  phoneNumber: Joi.string()
    .pattern(/^\d{3,20}$/)
    .required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'home', 'work').required(),
});

export const replaceContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(/^\d{3,20}$/),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'home', 'work'),
});
