const express = require("express");

const teacherRouter = express.Router();

let teachers = [
  { id: 1, name: "Teacher A", class: "1A" },
  { id: 2, name: "Teacher B", class: "1B" },
  { id: 3, name: "Teacher C", class: "2B" },
];

const timeLogger = (req, res, next) => {
  console.log("Request at", new Date());
  next();
};

// const validator = (req, res, next) => {
//   if (
//     req.method === "POST" &&
//     (!req.body.id || !req.body.name || !req.body.class)
//   ) {
//     res.send("Thiếu dữ liệu");
//     return;
//   }
//   next();
// };

const validator2 = (req, res, next) => {
  if (!req.body.id || !req.body.name || !req.body.class) {
    res.send("Thiếu dữ liệu");
    return;
  }
  next();
};

const adminValidate = (req, res, next) => {
  // Kiểm tra req.headers có x-api-key === 'admin' thì mới cho get all
  // Nếu không có header x-api-key
  // hoặc x-api-key !== admin thì res.send('Không có quyền truy cập')
  if (req.headers["x-api-key"] === "admin") {
    next();
  } else {
    res.send("Không có quyền truy cập");
    return;
  }
};

teacherRouter.use(timeLogger);
// teacherRouter.use();
// teacherRouter.use(adminValidate);

teacherRouter.get("/", adminValidate, (req, res) => {
  console.log("Router pass");
  res.send(teachers); // Get all
});

/* Tạo mới teacher
- Kiểm tra xem có đủ 3 trường id, name, class không
- Log thời gian bắt đầu request sử dụng new Date()
*/
teacherRouter.post("/", validator2, (req, res) => {
  teachers.push(req.body);
  res.send(teachers);
});

const checkExisting = (req, res, next) => {
  /* 
    Check xem id của params có trong mảng teacher không
    - Nếu có thì next () === cho delete
    - Nếu không có thì res.send('Không tồn tại teacher id')
  */
  const id = req.params.id;
  const existing = teachers.find((teacher) => String(teacher.id) === id);
  if (existing) {
    next(); // == Cho delete
  } else {
    res.send("Không tồn tại teacher id");
    return;
  }
};

teacherRouter.delete("/:id", checkExisting, (req, res) => {
  // Xoá ở đây
  teachers = teachers.filter((teacher) => String(teacher.id) !== req.params.id);
  res.send(teachers);
});

module.exports = { teacherRouter };
