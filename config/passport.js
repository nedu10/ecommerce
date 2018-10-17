const passport = require('passport')
const User = require('../models/user/account')
const localStrategy = require('passport-local')

//indicates that the user should be sserialize by id when stored in the session
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.find({_id: id}, function(err, user){
        done(err, user)
    })
})

passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password1',
    passReqToCallback: true
}, (req, email, password1, done) => {
    User.findOne({email: email}, function(err, user){
        if(err){
            return done(err)
        }
        if(user){
            return done(null, false, {message: 'Email already in use'})
            
        }
        var newUser = new User()
        newUser.first_name = req.body.first_name
        newUser.last_name = req.body.last_name
        newUser.email = email
        newUser.password = newUser.encryptPassword(password1)
        newUser.save()
        .then(user => {
            return done(null, user)
        })
        .catch(err => {
            return done(err)
        })
    })
}))

passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password1',
    passReqToCallback: true
}, (req, email, password1, done) => {
    User.findOne({email: email}, function(err, user){
        if(err){
            return done(err)
        }
        if(!user){
            return done(null, false, {message: 'User does not'})
            
        }
        if(!user.validPassword){
            return done(null, false, {message: 'Pass word does not match email'})
            
        }
        var newUser = new User()
            newUser.first_name = req.body.first_name
            newUser.last_name = req.body.last_name
            newUser.email = email
            newUser.password = newUser.encryptPassword(password1)
            newUser.save()
            .then(user => {
                return done(null, user)
            })
            .catch(err => {
                return done(err)
            })
    })
}))