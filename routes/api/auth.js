const express = require('express');

const ctrl = require('../../controllers/auth');
const {validateBody} = require("../../middlewares");
const authenticate = require('../../middlewares/authenticate');


const {schemas} = require("../../models/user");
const router = express.Router();

//signup
router.post("/users/register",validateBody(schemas.registerSchema),ctrl.register);

//signin

router.post("/users/login",validateBody(schemas.loginSchema),authenticate,ctrl.login);

module.exports = router;