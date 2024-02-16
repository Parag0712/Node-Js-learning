const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")

const productSchema = new mongoose.Schema({
    // Here Your Field
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required:true
    }

})

const Product = mongoose.model("Product", productSchema);