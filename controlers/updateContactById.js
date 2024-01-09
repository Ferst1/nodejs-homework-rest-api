import Contact from "../../models/Contact.js";
import { controllersWrapper } from "../../decorators/index.js";
import HttpError from "../../helpers/HttpError.js";
import { contactAddSchema } from "../../models/Contact.js";

const updateById = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, error, `Contact Id ${contactId} Not Found`);
  }
  res.json(result);
};

export default { updateById: controllersWrapper(updateById) };