const express = require('express');

const routes = express.Router();

const blog = require('../models/blogmodel');

const blogcontroller = require('../controllers/blogcontroller');

routes.get('/add_blog', blogcontroller.add_blog);

routes.post('/insertblog', blog.blogavatar, blogcontroller.insertblog);

routes.get('/views_blog', blogcontroller.views_blog);

routes.get('/deleterecord/:id', blogcontroller.deleterecord);

routes.get('/updaterecord', blogcontroller.updaterecord);

routes.post('/editblog', blog.blogavatar, blogcontroller.editblog);

routes.post('/mulDel', blogcontroller.mulDel);


module.exports = routes