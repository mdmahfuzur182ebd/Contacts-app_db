const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const router = require("./route");

const app = express();

app.set('view engine', 'ejs')

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/contacts", router);

app.get("/", (req, res) => {
  res.json({
    message: "JSON Formate Show",
  });
});

const PORT = process.env.PORT || 8080;

mongoose
  .connect(
    "mongodb+srv://mdmahfuzur7788:1234567890@node.caxq5c7.mongodb.net/test-db",
    { useNewUrlParser: true }
  )

  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is Running On " + PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  });
