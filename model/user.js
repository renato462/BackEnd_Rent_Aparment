const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String, required: true},
    name: {type: String},
    lastName: {type: String},
    email: {type: String, required: true},
    google:{type:Boolean, required: true ,default: false} ,
    img: {type: String},
    role: {type: String},
    password: {type: String, required: true}

});

module.exports = mongoose.model('User', userSchema);

