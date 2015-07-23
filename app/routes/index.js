var express = require('express');
var Route = express.Router();
var config = require('../../config/config');

Route.get('/', function(req, res) {
    res.render('index', {
        title: 'Home'
    });
});

var userController = require(config.root + '/app/controllers/user');

// FrontEnd routes
Route
    .get('/users',  userController.index)

module.exports = Route