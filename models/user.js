const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const userSchema = new Schema(
    {
        name: {
          type: String,
          required:true,
        },
        password: {
          type: String,
          minlength: 6,
          required: [true, 'Password is required'],
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
          required: true,
        },
      },{versionKey: false, timestamps: true}
);

userSchema.post("save", handleMongooseError);
// userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate); // mongoose pre hook
// userSchema.post("findOneAndUpdate", handleSaveError);



const registerSchema = Joi.object({
	  email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({  
	  email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const schemas = {
  registerSchema,
  loginSchema,
}

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
}