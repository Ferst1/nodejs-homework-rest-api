const express = require('express');

const ctrl = require('../../controllers/auth');
const {validateBody} = require("../../middlewares");

const {schemas} = require("../../models/user");
const router = express.Router();

//signup
router.post("/users/register",validateBody(schemas.registerSchema),ctrl.register);

//signin

router.post("/users/login",validateBody(schemas.loginSchema),ctrl.login);

module.exports = router;