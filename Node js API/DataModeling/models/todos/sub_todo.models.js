const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/todo');


const subTodo = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},{timestamps})
export const SubTodoModel = mongoose.model('SubTodo', subTodo)