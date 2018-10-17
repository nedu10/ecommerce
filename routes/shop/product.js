const express  = require('express');
const Product = require('../../models/shop/products')
const csrf = require('csurf')
const csrfProtection = csrf()

const router = express.Router()

router.use(csrfProtection)

router.get('/', (req, res, next) => {
    var productChunk = [];
    var chuckSize = 4;
    
    Product.find()
    .exec()
    .then(response1 => {
        for (let i = 0; i < response1.length; i+=chuckSize) {
            productChunk.push(response1.slice(i,i+chuckSize))
        }

        var message = req.flash('error')

        res.render('shop/products', { 
         title: 'eShopping',
         products: productChunk,
         csrfToken: req.csrfToken(),
         messages: message, 
         hasOneMessage: (message.length>0) ? true : false
        })
    })
    .catch( err => {

    })
})

module.exports = router