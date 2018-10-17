const mongoose = require('mongoose');

const Schema = mongoose.Schema

const productSchema = new Schema({
    product_title: {
        type: String,
        required: [true, 'product title is required'],
    },
    product_description: {
        type: String
    },
    product_price: {
        type: Number,
        required: [true, 'product price is required']
    },
    product_image: {
        type: Object,
        required: [true, 'product image is required']
    }
})

const productModel = mongoose.model('Product', productSchema)

module.exports = productModel