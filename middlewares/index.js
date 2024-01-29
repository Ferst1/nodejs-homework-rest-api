const isValidId = require("./isValidId");
const validateBody = require("./validateBody");
const  isEmptyBodyFavorite  = require("./isEpmtyFavorite");
const isEmptyBody = require("./emptyBody");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  isValidId,
  validateBody,
  isEmptyBody,
  isEmptyBodyFavorite,
  authenticate,
  upload,
};
