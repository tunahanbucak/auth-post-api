const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const port = process.env.PORT || 5001;
const dotenv = require("dotenv");
const Auth = require("./routes/auth");
const Post = require("./routes/post");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/", Auth);
app.use("/", Post);

app.get("/", (req, res) => {
  res.json({ message: "Deneme" });
});

db();

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
