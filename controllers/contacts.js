/* eslint-disable no-unused-vars */
const { Contact, schemas } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (_req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

const addContact = async (req, res) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    const errorPath = error.details
      .map((detail) => detail.path.join(""))
      .join("");
    throw HttpError(400, `Missing required ${errorPath} field`);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing fields");
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing field favorite");
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
