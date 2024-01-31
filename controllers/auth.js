const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const { User } = require("../models/user");

const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.resolve("public", "avatars");

//-------------REGISTER-----------

const register = async (req, res) => {
  const { email, password } = req.body;

  //унікальний message
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();
  console.log(verificationCode);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken: verificationCode,
  });

  const verifyEmail = {
      to : email,
      subject:"Verify email",
      html: `<a target="_blank" href="http:${BASE_URL}/api/users/verify/${verificationCode}">Click to verify email</a>`
  };
  await sendEmail(verifyEmail);

//   if (newUser.avatar === null) {
//       return res.status(404).send({ message: "Avatar not found" });
//   }

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      
      
    },
  });
};

//////////-----------------

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: null,
  });

  res.json({
    message: "Verification successful",
  });
};

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
  
    if (user.verify) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }
  
    // Создаем новый код верификации
    const verificationCode = nanoid();
  
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click verify email</a>`,
    };
  
    // Обновляем код верификации в базе данных
    await User.findByIdAndUpdate(user._id, { verificationToken: verificationCode });
  
    // Отправляем письмо
    await sendEmail(verifyEmail);
  
    res.json({ message: "Verification email sent" });
};

//----------------LOGIN------------

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

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
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

//---------------updateAvatar--------------------

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  // Перевірка, чи був переданий файл
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

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

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  current: ctrlWrapper(current),
  logout: ctrlWrapper(logout),
  patchSubscription: ctrlWrapper(patchSubscription), 
  updateAvatar: ctrlWrapper(updateAvatar),
};
