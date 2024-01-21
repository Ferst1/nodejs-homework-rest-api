const express = require("express");

const ctrl = require("../../controllers/auth");

const {validateBody,authenticate} = require("../../middlewares");

const {schemas} = require("../../models/user");



const router = express.Router();



//Створюемо маршрут


//----SIGNUP----
 router.post("/register",validateBody(schemas.registerSchema), ctrl.register);

 //--signin---
 router.post("/login",authenticate, validateBody(schemas.loginSchema), ctrl.login);


 //---logaut--

router.post("/logout", authenticate, ctrl.logout);


//----current user----------------

router.get("/current", authenticate, ctrl.current);

module.exports = router;
