const mongoose = require("mongoose");

const app = require('./app');

// const {DB_HOST,PORT=3000} = process.env;
const {DB_HOST} = require('./config.js');

mongoose.set('strictQuery', true);
mongoose.connect(DB_HOST)
.then(()=> {
  app.listen(PORT=3000, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
  })
.catch(error => {
  console.log(error.message);
  process.exit(1);
})


