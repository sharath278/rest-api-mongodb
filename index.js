const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");

let port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

main()
  .then(() => {
    console.log("Connection successful to DB:", mongoose.connection.name);
  })
  .catch((err) => {
    console.log("Connection error");
    console.error(err.message);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/content");
}

const userSchema = new mongoose.Schema({
  User: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    maxLength: 50,
  }
});


const feed = mongoose.model("Post", userSchema);

app.get("/", async (req, res) => {
  try {
    const posts = await feed.find({ User: { $exists: true } });
    res.render("home.ejs", { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
});


/*
feed.insertMany([
  { User: 'Virat Kohli', msg: 'Consistency is the key to success' },
  { User: 'Mahesh Babu', msg: 'Success is not a destination, it’s a journey' }
])
.then(result => console.log('Inserted:', result))
.catch(err => console.error('Error:', err));
*/

app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
