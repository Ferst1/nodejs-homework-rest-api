const express = require("express");

const ctrl = require("../../controllers/auth");

const {isEmptyBody, validateBody,authenticate} = require("../../middlewares");

const {schemas} = require("../../models/user");

const router = express.Router();




//----SIGNUP----
 router.post("/register",isEmptyBody,validateBody(schemas.registerSchema), ctrl.register);
//.single - have to be after contactAddValidate!, in the field avatar will be only one file. if need to send 5 files - .array("avatar", 5)


 //--signin---
 router.post("/login",validateBody(schemas.loginSchema), ctrl.login);


 //---logaut--

router.post("/logout", authenticate, ctrl.logout);


//----current user----------------

router.get("/current", authenticate, ctrl.current);

//---router for subscription

router.patch("/", authenticate,validateBody(schemas.subscriptionSchema), ctrl.patchSubscription);


//--------router for avatar

// router.patch(
// 	"/users/avatars",
// 	authenticate,
// 	ctrlWrapper(updateAvatar)
// );


module.exports = router;
