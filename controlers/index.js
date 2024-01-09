import getAllContacts from "./getAllContacts.js";
import getContactById from "./getContactById.js";
import addNewContact from "./addNewContact.js";
import removeContactById from "./removeContactById.js";
import updateContactById from "./updateContactById.js";
import updateFavorite from "./updateFavorite.js";

export default {
  getAll: getAllContacts.getAll,
  getById: getContactById.getById,
  addNew: addNewContact.addNew,
  removeById: removeContactById.removeById,
  updateById: updateContactById.updateById,
  updateFavoriteById: updateFavorite.updateFavoriteById,
};