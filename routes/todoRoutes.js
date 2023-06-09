const {addNewTodo, getAllTodos, addTask, deleteTask, deleteTodo} = require('../controllers/todoController');
const router = require('express').Router();

router.post('/add-todo' , addNewTodo);
router.get('/all-todos/:userId' , getAllTodos);
router.delete('/delete-todo/:id' , deleteTodo);

router.post('/add-task/:id' , addTask);
router.delete('/delete-task/:id' , deleteTask);



module.exports = router;