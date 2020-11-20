const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String , unique:true},
    name: {type: String},
    lastName: {type: String},
    email: {type: String, required: true, unique:true},
    google:{type:Boolean, required: true ,default: false} ,
    img: {type: String},
    role: {type: String, default: "admin"},
    password: {type: String, required: true},
    status:{type: Boolean, default: false}

});

module.exports = mongoose.model('User', userSchema);

