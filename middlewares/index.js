const validateBody = require("./validateBody");
const { isEmptyBody, isEmptyBodyFavorite } = require("./emtyBody");
const isValidId = require("./isValidId");   


module.exports = { validateBody, isEmptyBody, isValidId, isEmptyBodyFavorite };
