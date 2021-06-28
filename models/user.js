/*jshint esversion: 6 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSquema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSquema.pre('save', function (next){
    const user = this;

    bcrypt.hash(user.password, 10, (err,hash) => {
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('User',UserSquema);