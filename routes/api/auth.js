const express = require("express");

const ctrl = require("../../controllers/auth");

const {validateBody} = require("../../middlewares");

const {schemas} = require("../../models/user");



const router = express.Router();



//Створюемо маршрут

 router.post("/register",validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;
