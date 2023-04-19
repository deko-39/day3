const express = require("express");

const studentRouter = express.Router();

const students = [
  {
    id: 1,
    name: "A",
    age: 10,
  },
  {
    id: 2,
    name: "B",
    age: 11,
  },
];

studentRouter.use((req, res, next) => {
  /* Kiểm tra body của request xem có đủ 3 trường id, name, age không
    - Nếu đủ thì next()
    - Nếu không đủ thì res.send('Thiếu dữ liệu')
    */

  if (
    req.method === "POST" &&
    (!req.body.id || !req.body.name || !req.body.age)
  ) {
    res.send("Thiếu dữ liệu");
    return;
  }

  console.log("User là", req.user);

  next();
});

studentRouter.get("/", (req, res) => {
  res.send(students);
});

studentRouter.post("/", (req, res) => {
  students.push(req.body);
  res.send(students);
});

module.exports = { studentRouter };
