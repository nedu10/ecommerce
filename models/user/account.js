const mongoose =require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const Schema = mongoose.Schema

const accountSchema = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

accountSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

accountSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

const accountModel = mongoose.model('user-account', accountSchema)

module.exports = accountModel