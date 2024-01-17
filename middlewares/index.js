const isValidId = require("./isValidId");
const validateBody = require("./validateBody");
const  isEmptyBodyFavorite  = require("./isEpmtyFavorite");
const isEmptyBody = require("./emptyBody");

const authenticate = require("./authenticate")

module.exports = {
  isValidId,
  validateBody,
  isEmptyBody,
  isEmptyBodyFavorite,
};
