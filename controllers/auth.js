
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
        name: newUser.name,
    })
}
//----------------------------------Login

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
       // we save token when login is successful
        res.json({
            token});
        }

    
module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
}