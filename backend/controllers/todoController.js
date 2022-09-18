
const Todo = require('../models/todosModel');
const mongoose = require('mongoose');

// get all todos
const getAllTodos = async (req, res) => {
    const user_id = req.user._id

    const todos = await Todo.find({user_id}).sort({createdAt: -1});
    res.status(200).json(todos);
}
// get one todo
const getOneTodo = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid id'});
    }
    const todo = await Todo.findById(id);

    if(!todo){
        return res.status(404).json({msg: 'Todo not found'});
    }

    res.status(200).json(todo); 
}

// create new todo
const CreateTodo = async (req, res) => {
    const {title, date ,duration} = req.body;

    
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!date) {
        emptyFields.push('date')
    }
    if (!duration) {
        emptyFields.push('duration')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

  // add doc to db
    try {
        const user_id = req.user._id
        const todo = await Todo.create({title, date, duration, user_id});
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({error: error.message});
        
    }
};

// update todo
const updateTodo = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such todo'})
    }
  
    const todo = await Todo.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!todo) {
      return res.status(400).json({error: 'No such todo'})
    }
  
    res.status(200).json(todo)
  }


// delete todo
const deleteTodo = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid id'});
    }
    const todo = await Todo.findByIdAndDelete({_id: id});

    if(!todo){
        return res.status(404).json({msg: 'Todo not found'});
    }

    res.status(200).json(todo); 
}


module.exports = {
    getAllTodos,
    getOneTodo,
    CreateTodo,
    updateTodo,
    deleteTodo
}