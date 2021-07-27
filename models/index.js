const mongoose = require('mongoose');

var newUserSchema = mongoose.Schema({

    name:String,
    email:String,
    password:String
});

module.exports = mongoose.model('users',newUserSchema); 