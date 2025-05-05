require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const users = require("./routes/users");

app.get("/", (req, res) => {
  res.send("Hello11");
});

app.use("/users", users);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is listening on port: ", PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });
