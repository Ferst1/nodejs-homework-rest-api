
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const {User} = require("../models/user");
const avatarsDir = path.resolve("public", "avatars");
const {HttpError, ctrlWrapper} = require("../helpers");
 const { required } = require("joi");

const {SECRET_KEY} = process.env;


//-------------REGISTER-----------

const register = async (req, res) => {
    
const {email,password} = req.body;

//унікальний message
const user = await User.findOne({email});
if(user){
    throw HttpError(409, "Email already in use");
}


const hashPassword = await bcrypt.hash(password, 10);
const avatarURL = gravatar.url(email);

const newUser = await User.create({...req.body,password:hashPassword, avatarURL});

if (user.avatar === null) {
    return res.status(404).send({ message: "Avatar not found" });
}


res.status(201).json({
    user: {
        email: newUser.email,
        subscription: newUser.subscription,
    },

})

}
//----------------LOGIN------------

 const login = async (req, res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if (!user){
        throw HttpError(401, "Email or password invalid");
    }
    
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare){
        throw HttpError(401, "Email or password invalid");
    }


      const payload = {
          id: user._id,
      };

      const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
      

    await User.findByIdAndUpdate(user._id, {token});

    
    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    });

 }


 //-----------current user

 const current = async (req, res) => {
	const { email, subscription } = req.user;

	res.status(200).json({
		email,
		subscription,
	});
};

//----------logaut----------------

const logout = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json({
		message: "No Content",
	});
};


//--------PathchSubscription------------
const patchSubscription = async (req, res) => {

    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id,req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
};

//---------------updateAvatar--------------------

const updateAvatar = async (req, res) => {
	const { _id } = req.user;

	const { path: tempUpload, originalname } = req.file;
	const filename = `${_id}_${originalname}`;

	const resultUpload = path.join(avatarsDir, filename);

	Jimp.read(tempUpload, (err, image) => {
		if (err) throw HttpError(404, err);
		image.resize(250, 250).write(resultUpload);
	});

	await fs.rename(tempUpload, resultUpload);

	const avatarURL = path.join("avatars", filename);
	await User.findByIdAndUpdate(_id, { avatarURL });

	res.status(200).json({ avatarURL });
};

module.exports={
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
    patchSubscription: ctrlWrapper(patchSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}