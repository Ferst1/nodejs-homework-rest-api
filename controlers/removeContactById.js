import Contact from "../../models/Contact.js";
import { controllersWrapper } from "../../decorators/index.js";
import HttpError from "../../helpers/HttpError.js";

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, `Contact Id ${contactId} Not Found`);
  }
  return res.status(200).json({ message: "contact deleted" });
};

export default { removeById: controllersWrapper(removeById) };