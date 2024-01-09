import Contact from "../../models/Contact.js";
import { controllersWrapper } from "../../decorators/index.js";
import HttpError from "../../helpers/HttpError.js";

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact Id ${contactId} Not Found`);
  }
  res.json(result);
};

export default { updateFavoriteById: controllersWrapper(updateFavoriteById) };