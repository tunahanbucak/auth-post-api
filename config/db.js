const mongoose = require("mongoose");
require("dotenv").config();

const db = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("mongodb connect");
    })
    .catch((err) => {
      //throw new Error(err.message);
      console.log(err);
    });
};

module.exports = db;
