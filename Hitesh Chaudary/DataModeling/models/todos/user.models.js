const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/todo');

// UserSchema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

// Export Model
export const User = mongoose.model('User', userSchema)

