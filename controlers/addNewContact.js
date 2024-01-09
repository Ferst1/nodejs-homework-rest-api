import Contact from "../../models/сontaсt.js";
import { controllersWrapper } from "../../decorators/index.js";

const addNew = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

export default { addNew: controllersWrapper(addNew) };