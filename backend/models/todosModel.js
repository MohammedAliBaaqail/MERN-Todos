const mongoose = require('mongoose');

const Schema = mongoose.Schema

const todoSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    date:{
        type: String,
        
        required: true
    },
    duration: {
        type: String,
        default: 'One Hour',
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Date,
        default: null,
    },
    user_id: {
      type: String,
      required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Todo', todoSchema);

