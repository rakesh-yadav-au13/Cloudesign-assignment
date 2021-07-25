import express from "express";
import multer from "multer";
const router = express.Router();

import {
  createTodo,
  editTask,
  getAllTask,
  deleteTask,
  getTaskById,
  updateStatus,
} from "../controlers/TodoControler";

// const diskStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "src/public");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const uplode = multer({ storage: diskStorage });
router.post("/create-task", createTodo);

router.post("/edit-task", editTask);

router.get("/get-task", getAllTask);

router.get("/get-task/:id", getTaskById);

router.post("/delete-task/:id", deleteTask);

router.post("/update-status", updateStatus);

export default router;
