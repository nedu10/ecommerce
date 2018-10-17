const express = require('express')
const mongoose = require('mongoose')
const csrf = require('csurf')
const passport = require('passport')

const csrfProtection = csrf()

const router = express.Router()

router.use(csrfProtection)

router.get('/signup', (req, res, next) => {
    var message = req.flash('error')
    res.render('user/signup', {title: 'eShopping', csrfToken: req.csrfToken(), messages: message, hasOneMessage: (message.length>0) ? true : false})
})
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/products',
    failureRedirect: '/products',
    failureFlash: true
}))

module.exports = router