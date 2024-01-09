import Contact from "../../models/Contact.js";
import { controllersWrapper } from "../../decorators/index.js";
import HttpError from "../../helpers/HttpError.js";

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Contact Id ${contactId} Not Found`);
  }
  res.json(result);
};

export default { getById: controllersWrapper(getById) };