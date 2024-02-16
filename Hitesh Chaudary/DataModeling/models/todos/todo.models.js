const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/todo');

const todoSchema = new mongoose.Schema({
    contact: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    subTodo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo"
    }]
}
    , { timestamps: true })

export const Todo = mongoose.model('Todo', todoSchema)

