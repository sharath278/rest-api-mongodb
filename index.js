const mongoose = require("mongoose");
const express = require("express");
const app = express();
let port = 8080;
// const methodOverride = require("method-override");
// app.use(methodOverride("_method"));

const path = require("path");
const { kStringMaxLength } = require("buffer");
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log("Connection error");   
    console.error(err.message);       
  });

  async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/content");
}

const userSchema = new mongoose.Schema({
    User :{
        type : String,
        required:true,
    },
    msg:{
        type : String,
        maxLength : 50,
    }
   
});
const feed = mongoose.model("post", userSchema);

app.get("/",(req,res)=>{
    res.send("server is working...");
})

app.listen(port,()=>{
    console.log("app is listening...");
})









// feed.insertMany([
//   { User : 'virat kohli', msg :'consistency is the key to success' },
//   { User : 'Mahesh babu', msg : 'success is not a destination its a journey' }
// ])
// .then(result => console.log('Inserted:', result))
// .catch(err => console.error('Error:', err));








