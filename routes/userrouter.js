const express = require('express');

const routes = express.Router();

const usercontroller = require('../controllers/usercontroller');

routes.get('/', usercontroller.index)

routes.get('/blog_single',usercontroller.blog_single);


module.exports = routes;