const mongoose = require("mongoose");

const OrdersModel = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    orderDate: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    deliveryDate: {
        type: Number
    },
    trackingURL: {
        type: String,
        required: true
    },
    customerId: {
        type: String
    },
    deliveryAddress: {
        type: String
    }
});

const PrdoductModel = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    productType: {
        type: String,
    },
    inStock: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number
    }
});

const UserModel = new mongoose.Schema({
    userType: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    DOB: {
        type: String
    },
    sex: {
        type: String
    },
    email: {
        type: String
    },
    poneNo: {
        type: String
    },
    address: {
        type: JSON
    },
    password: {
        type: String
    }
});

const orders = mongoose.model("orders", OrdersModel);
const products = mongoose.model("products", PrdoductModel);
const users = mongoose.model("users", UserModel);


module.exports = {
    orders,
    products,
    users
};