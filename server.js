const mongoose = require("mongoose");

const app = require("./app");

const { PORT = 3000 } = process.env;

// mongoose.set('strictQuery', true);
// mongoose.connect(DB_HOST)
// .then(()=> {
// app.listen(PORT)
// })
//
// .catch(error => {
// console.log(error.message);
// process.exit(1);
// })
//

const uriDb = process.env.DB_HOST;
console.log(uriDb);

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
