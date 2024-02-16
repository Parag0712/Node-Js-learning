const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/nayaappforgolus")

const postSchema = mongoose.Schema(
    {
        postText: {
            type: String,
            required: true,
        },
        
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        
        createdAt: {
            type: Date,
            default: Date.now,
        },
        likes: {
            type: Array,
            default:[],
        },
    }
)

module.exports = mongoose.model('Post',postSchema)

