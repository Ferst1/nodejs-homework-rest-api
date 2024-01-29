const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



const userSchema = new Schema(    
    {
        password: {
          type: String,
          minlength: 6,
          required: true,
        },
        email: {
          type: String,
          match: emailRegexp,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
        avatarURL: {
          type: String,
          required: true,
          
        }
      },
    {versionKey: false, timestamps: true}
);
userSchema.post("save", handleMongooseError);

//Створюємо 2 joi схеми на регестрацію та логін
const registerSchema = Joi.object({    
    name: Joi.string(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})


const loginSchema = Joi.object({    
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const schemas ={
    registerSchema,
    loginSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};
