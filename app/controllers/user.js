var mongoose = require('mongoose');
var config = require('../../config/config');

exports.index = function (req, res) {

    res.render('user', {
        title: 'User'
    });
}