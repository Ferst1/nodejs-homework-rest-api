const express = require("express");
const ctrl = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", isValidId, ctrl.addContact);

router.put("/:contactId", isValidId, ctrl.updateContact);

router.delete("/:id", isValidId, ctrl.removeContact);

router.patch("/:contactId/favorite", isValidId, ctrl.updateStatusContact);

module.exports = router;
