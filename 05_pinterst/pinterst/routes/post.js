const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },

        posttitle: {
            type: String,
            required: true,
        },
        postdescription: {
            type: String,
            required: true,
        },
        postimage:{
            type:String,
            required:true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)

module.exports = mongoose.model('Post', postSchema)

