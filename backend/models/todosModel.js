const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
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
}, {timestamps: true});

module.exports = mongoose.model('Todo', todoSchema);

