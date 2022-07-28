const express = require("express");
const cors = require("cors");
const bookRouter = require("./routes/books");
const studentRouter = require("./routes/students");
const dbStep = require("./db/database");
const app = express();
dbStep();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/students", studentRouter);
app.use("/books", bookRouter);
app.listen(8080, () => console.log("server is listing on port 8080"));
