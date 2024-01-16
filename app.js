const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const bcrypt = require("bcrypt");
const createHashPassword = async (password) => {
  // const salt = await bcrypt.genSalt(10);
  // console.log(salt);

  const result = await bcrypt.hash(password, 10);
  // console.log(result);
  const compareResult1 = await bcrypt.compare(password, result);

  console.log(compareResult1);
  const compareResult2 = await bcrypt.compare("123456", result);
  console.log(compareResult2);
}
createHashPassword('123456')




const authRouter = require("./routes/api/auth");

const app = express();
const contactsRouter = require("./routes/api/contacts");
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
