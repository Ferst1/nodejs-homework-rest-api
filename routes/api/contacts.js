const express = require("express");

const ctrl = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", ctrl.addContact);

router.put("/:id", isValidId, ctrl.updateContact);

router.patch("/:id/favorite", isValidId, ctrl.updateStatusContact);

router.delete("/:id", isValidId, ctrl.removeContact);

module.exports = router;
