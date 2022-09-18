const express = require('express');
const { CreateTodo,
        getAllTodos,
        getOneTodo ,
        updateTodo,
        deleteTodo,
  } = require('../controllers/todoController');

const requireAuth = require('../middleware/requireAuth')
const router = express.Router();

// require auth for all todos routes
router.use(requireAuth)

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
