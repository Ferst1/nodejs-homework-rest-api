
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {User} = require('../models/user')
const { HttpError, ctrlWrapper } = require("../helpers");
const {SECRET_KEY} = process.env;




// const decodeToken = jwt.decode(token);
//console.log(decodeToken);

// try {
//     const {id} = jwt.verify(token, SECRET_KEY);
//     console.log(id);
//     const invalidToken = jwt.verify(token, SECRET_KEY);
//     const result = jwt.verify(invalidToken, SECRET_KEY);
// } catch (error) {
//     console.log(error.message);
// }

//------------------------------------------Register----------------------
const register = async (req, res) => {
    const {email,password} = req.body;   
    const user = await User.findOne({email});
    if(user){
        throw HttpError(409, 'Email in use');
    }


    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body,password:hashPassword});
    res.status(201).json({ 
        email: newUser.email, 
        subscription: newUser.subscription
    })
}
//----------------------------------Login--signin-------------------------

    const login = async (req, res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        throw HttpError(401, 'Email or password is wrong');
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        throw HttpError(401, 'Email or password is wrong');
    }


    const payload= {id:user_id,}
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    
    await User.findByIdAndUpdate(user._id, { token }); // we save token when login is successful
  res
    .status(200)
    .json({ email: user.email, subscription: user.subscription, token });
};
     

//-----------------------------------Logout--------------------------------

    const logout= async(req, res) => {

        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: "" });
        res.json({ message: "No content" }); // when I add .status(204) - postman respond is empty
      };
    



module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
}