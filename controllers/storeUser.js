/*jshint esversion: 6 */
//Ramírez González Leonardo Ramsés

const User = require('../models/user');
const path = require('path');

module.exports = (req, res) => {
    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save((err, user) => {
        if(err){
            req.session.userId = user._id;
            return res.redirect('/users/register');
        } 

        res.redirect('/');
    });
};
