const mongoose = require("mongoose");

const app = require('./app');

const DB_HOST= "mongodb+srv://Olena:hiaDpFnTUDQl4l7c@cluster1.dr5ntwt.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);
mongoose.connect(DB_HOST)
.then(()=> {
  app.listen(3000)
  })
.catch(error => {
  console.log(error.message);
  process.exit(1);
})


