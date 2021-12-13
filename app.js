const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const fielUpload = require("express-fileupload");
const app = express();
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Couldn't connect to db"));

app.use(express.json());
app.use(cors());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//     createParentPath: true,
//   })
// );

app.get("/", async (req, res) => {
  res.json({ message: "Route works" });
});

app.use("/api/v1/products", require("./routes/product"));
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/categories", require("./routes/category.js"));
app.use("/api/v1/comments", require("./routes/comment.js"));

const port = process.env.PORT;
app.listen(port, () => console.log("Server running..."));
