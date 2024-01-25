const express = require("express");

const ctrl = require("../../controllers/auth");

const {isEmptyBody, validateBody,authenticate} = require("../../middlewares");

const {schemas} = require("../../models/user");

const router = express.Router();




//----SIGNUP----
 router.post("/register",isEmptyBody,validateBody(schemas.registerSchema), ctrl.register);

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
// 	"/avatars",
// 	authenticate,
// 	upload.single("avatar"),
// 	ctrlWrapper(updateAvatar)
// );
module.exports = router;
