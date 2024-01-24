
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// const gravatar = required("gravatar");

const {User} = require("../models/user");

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


const newUser = await User.create({...req.body,password:hashPassword});

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



module.exports={
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
    patchSubscription: ctrlWrapper(patchSubscription),
}