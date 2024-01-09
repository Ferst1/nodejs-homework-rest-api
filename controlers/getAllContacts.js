import Contact from "../../models/Contact.js";
import { controllersWrapper } from "../../decorators/index.js";

const getAll = async (req, res) => {
  const result = await Contact.find(); // ({}, "name, email, etc") - if need only special fields
  res.json(result);
};

export default { getAll: controllersWrapper(getAll) };