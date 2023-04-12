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
  try {
    const allTodos = await Todo.find();
    res.status(200).json(allTodos);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Update Todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const todo = req.body;

  try {
    const isTodo = await Todo.findById(id);
    if (isTodo) {
      const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });
      res.status(200).json(updatedTodo);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Delete Todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const isTodo = await Todo.findById(id);
    if (isTodo) {
      await Todo.findByIdAndDelete(id);
      const allTodos = await Todo.find();
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

  try {
    const isTodo = await Todo.findById(id);
    if (isTodo) {
      await Todo.findByIdAndUpdate(
        id,
        { $push: { tasks: task } },
        { new: true }
      );

      const allTodos = await Todo.find();
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
  const taskId = req.body.taskId;
  try {
    const isTodo = await Todo.findById(id);
    if (isTodo) {
      await Todo.findByIdAndUpdate(
        id,
        { $pull: { tasks: { _id: taskId } } },
        { new: true }
      );

      const allTodos = await Todo.find();
      res.status(201).json(allTodos);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
