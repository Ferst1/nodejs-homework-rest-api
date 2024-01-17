
const jwt = require('jsonwebtoken');
const { User } = require("../models/user");
const  HttpError  = require("../helpers/HttpError");

const { SECRET_KEY } = process.env;



const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(' ',2);
    
    if (bearer !== 'Bearer') {
         next(new HttpError(401,"Invalid token"));
    }


    req.user ={
        id:decode.id,
        name:decode.name,
    }

    try {
        const { id } = jwt.verify(token,SECRET_KEY);
        const user = await User.findById(id);
        
        if (!user || !user.token || user.token !== token) {
			next(HttpError(401, "Invalid token"));
		}
		req.user = user;
        
        next();
    } 
    catch (error) {
         next(new HttpError(401));
    }
}

module.exports = authenticate;




