const { HttpError } = require("../helpers/");

const isEmptyBodyFavorite = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(HttpError(400, "missing field favorite"));
    }
    next();
  };

  module.exports = isEmptyBodyFavorite;