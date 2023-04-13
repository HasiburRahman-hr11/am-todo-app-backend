const Todo = require("../models/Todo");

// Create New Todo
exports.addNewTodo = async (req, res) => {
  const todo = req.body;

  try {
    const newTodo = new Todo(todo);
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get All Todos
exports.getAllTodos = async (req, res) => {
  const userId = req.params.userId;
  try {
    const allTodos = await Todo.find({ user: userId });
    res.status(200).json(allTodos);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};



// Delete Todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.query.userId;
  try {
    const isTodo = await Todo.findById(id);
    if (isTodo) {
      await Todo.findByIdAndDelete(id);
      const allTodos = await Todo.find({user:userId});
      res.status(200).json(allTodos);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Create New Task
exports.addTask = async (req, res) => {
  const { id } = req.params;
  const task = req.body.task;
  const userId = req.query.userId;

  try {
    const isTodo = await Todo.findById(id);
    if (isTodo) {
      await Todo.findByIdAndUpdate(
        id,
        { $push: { tasks: task } },
        { new: true }
      );

      const allTodos = await Todo.find({ user: userId });
      res.status(201).json(allTodos);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Delete Todo
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const taskId = req.query.taskId;
  const userId = req.query.userId;
  try {
    const isTodo = await Todo.findById(id);
    if (isTodo) {
      await Todo.findByIdAndUpdate(
        id,
        { $pull: { tasks: { _id: taskId } } },
        { new: true }
      );

      const allTodos = await Todo.find({user:userId});
      res.status(201).json(allTodos);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
