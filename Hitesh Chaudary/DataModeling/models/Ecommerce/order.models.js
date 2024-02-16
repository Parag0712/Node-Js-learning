const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")


// SubSchema
const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    }
})

const orderSchema = new mongoose.Schema({
    orderPrice: {
        type: Number,
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orderItem: {
        type: [orderItemSchema]
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["DELIVERED","CANCELLED","PENDING"],
        default:"PENDING"
    }
    
})
const Order = mongoose.model("Order", orderSchema);