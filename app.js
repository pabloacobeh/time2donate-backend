const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Couldn't connect to db"));

app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

app.use("/api/products", require("./routes/product"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/category.js"));
app.use("/api/comments", require("./routes/comment.js"));

const port = process.env.PORT;
app.listen(port, () => console.log("Server running..."));
