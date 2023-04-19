const express = require("express");
const { studentRouter } = require("./student");
const { teacherRouter } = require("./teacher");
const morgan = require("morgan");

const app = express();

app.use(express.json());

// app.use(morgan("combined"));

const myCustomerLogger = (name) => {
  return function (req, res, next) {
    console.log("Logger from ", name);
    req.user = { name: "Admin" };
    next();
  };
};

// const checkBody = function (req, res, next) {
//   const body = req.body;
//   //   if (!body.name) {
//   //     res.send("Error");
//   //   }
//   next();
// };

app.use("/students", myCustomerLogger("student"));
app.use("/teachers", myCustomerLogger("teacher"));

app.use("/students", studentRouter);
app.use("/teachers", teacherRouter);

// app.get("/students", (req, res) => {
//   res.send("Student router GET");
// });

app.listen(3000);
console.log("Server start");
