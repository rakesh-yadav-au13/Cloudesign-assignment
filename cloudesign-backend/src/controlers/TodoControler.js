import TaskSchema from "../models/schemas/TaskSchema";

export const createTodo = async (req, res) => {
  try {
    const { title, discription, status } = req.body;

    let todo = await TaskSchema.findOne({ title: title });
    if (todo) {
      return res.status(400).json({
        success: false,
        data: {},
        errors: [
          {
            value: title,
            msg: "Task already exist",
            param: "title",
            location: "body",
          },
        ],
        message: "Task already exist",
      });
    }
    todo = new TaskSchema({
      title,
      discription,
      status,
    });
    await todo.save();
    return res.status(200).json({
      success: true,
      data: {},
      errors: [],
      message: "Task added successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const editTask = async (req, res) => {
  try {
    const { _id, title, discription } = req.body;
    let task = await TaskSchema.findOneAndUpdate(
      { _id: _id },
      {
        title: title,
        discription: discription,
        status: "In-progress",
      },
      { new: true }
    );
    if (!task) {
      return res.status(400).json({
        success: false,
        data: {},
        errors: [
          {
            value: id,
            msg: "Task not exist",
            param: "title",
            location: "body",
          },
        ],
        message: "Task not exist",
      });
    }
    return res.status(200).json({
      success: true,
      data: task,
      errors: [],
      message: "Task edited sucessfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllTask = async (req, res) => {
  try {
    let tasks = await TaskSchema.find();
    if (!tasks.length) {
      return res.status(400).json({
        success: false,
        data: {},
        errors: [
          {
            value: tasks,
            msg: "Task not found",
            param: "title",
            location: "body",
          },
        ],
        message: "Task not found",
      });
    }
    res.status(200).json({
      success: true,
      data: tasks,
      errors: [],
      message: "Task fatched sucessfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getTaskById = async (req, res) => {
  try {
    let task = await TaskSchema.findOne({ _id: req.params.id });
    if (!task) {
      return res.status(400).json({
        success: false,
        data: {},
        errors: [
          {
            value: req.body.id,
            msg: "Task not found",
            param: "title",
            location: "body",
          },
        ],
        message: "Task not found",
      });
    }
    res.status(200).json({
      success: true,
      data: task,
      errors: [],
      message: "Task fatched sucessfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    let task = await TaskSchema.findOneAndDelete({ _id: id });
    if (!task) {
      return res.status(400).json({
        success: false,
        data: {},
        errors: [
          {
            value: task,
            msg: "Task not found",
            param: "title",
            location: "body",
          },
        ],
        message: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: {},
      errors: [],
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    let task = await TaskSchema.findOneAndUpdate(
      { _id: id },
      {
        status: status,
      },
      { new: true }
    );
    if (!task) {
      return res.status(400).json({
        success: false,
        data: {},
        errors: [
          {
            value: id,
            msg: "Task not exist",
            param: "title",
            location: "body",
          },
        ],
        message: "Task not exist",
      });
    }
    return res.status(200).json({
      success: true,
      data: task,
      errors: [],
      message: "Status updated sucessfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};
