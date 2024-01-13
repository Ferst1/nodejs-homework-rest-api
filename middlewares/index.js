const isValidId = require("./isValidId");
const validateBody = require("./validateBody");
const { isEmptyBody, isEmptyBodyFavorite } = require("./emptyBody");
module.exports = {
  isValidId,
  validateBody,
  isEmptyBodyFavorite,
};
