const express = require("express");

const ctrl = require("../../controllers/auth");

const {isEmptyBody, validateBody,authenticate,upload} = require("../../middlewares");
const {ctrlWrapper} = require("../../helpers");

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

router.patch("/",upload.single("avatar"), authenticate,validateBody(schemas.subscriptionSchema), ctrl.patchSubscription);


//--------router for avatar

router.patch(
	"/avatars",
	authenticate,
    upload.single("avatar"),
	ctrlWrapper(ctrl.updateAvatar)
);


module.exports = router;
