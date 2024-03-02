const express = require("express");
require("dotenv").config();
const path = require("path");

const app = express();
const morgan = require("morgan");

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "dist")));
// router
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
