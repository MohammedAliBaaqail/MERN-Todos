const express = require('express');
const { CreateTodo,
        getAllTodos,
        getOneTodo ,
        updateTodo,
        deleteTodo,
  } = require('../controllers/todoController');

const router = express.Router();

// GET all todos
router.get('/', getAllTodos);

//GET one todo
router.get('/:id', getOneTodo);

//POST one todo
router.post('/', CreateTodo)

//UPDATE one todo
router.patch('/:id',updateTodo )

//DELETE one todo
router.delete('/:id',deleteTodo)

module.exports = router;
