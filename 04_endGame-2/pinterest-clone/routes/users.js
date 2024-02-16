const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/pinterest-clone")

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }],
    dp: {
      type: String, // Assuming dp is a URL or path to the display picture
    },
    fullname: {
      type: String,
      required: true,
    },
  }
)
userSchema.plugin(plm, {
  usernameField: 'email'
});
module.exports = mongoose.model('User', userSchema)
