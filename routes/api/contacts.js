const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const {
  authenticate,
  validateBody,
  isEmptyBody,
  isValidId,
  isEmptyBodyFavorite,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/",authenticate,ctrl.listContacts);

router.get("/:id",authenticate, isValidId, ctrl.getContactById);

router.post("/",authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  "/:id",
  authenticate,
  isEmptyBody,
  validateBody(schemas.putSchema),
  ctrl.updateContact
);

router.delete("/:id",authenticate, isValidId, ctrl.removeContact);

router.patch(
  "/:id/favorite",
  authenticate,
  isEmptyBodyFavorite,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
