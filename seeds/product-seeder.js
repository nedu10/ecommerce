const mongoose = require('mongoose')

const Product = require('../models/products')

//setting up DB
dbURL = 'mongodb://127.0.0.1:27017/cee-kay'  //locally installed mongodb

mongoose.connect(dbURL, {useNewUrlParser: true})
mongoose.Promise = global.Promise;

const product = [
    new Product ({
        product_title: 'SEBAGO',
        product_description: 'this is a very nice shoe that i have been using for a very long time',
        product_price: "6000",
        product_image: {
            image_name: 'first-shoe',
            image_path: 'images/sebago.jpg'
        }
    }),
    new Product ({
        product_title: 'SEBAGO',
        product_description: 'this is a very nice shoe that i have been using for a very long time',
        product_price: "6000",
        product_image: {
            image_name: 'first-shoe',
            image_path: 'images/sebago.jpg'
        }
    }),
    new Product ({
        product_title: 'SEBAGO',
        product_description: 'this is a very nice shoe that i have been using for a very long time',
        product_price: "6000",
        product_image: {
            image_name: 'first-shoe',
            image_path: 'images/sebago.jpg'
        }
    })
]
 
var done = 0
for (let i = 0; i < product.length; i++) {
    product[i].save()
    .then(response1 => {
        done++
        if(done === product.length){
            mongoose.disconnect()
        }
    })
    .catch(err => {
        console.log(err)
    })
    
}