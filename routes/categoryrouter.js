const express = require('express');

const routes = express.Router();

const categoryController = require('../controllers/categoryController');

routes.get('/add_category',categoryController.add_category);

routes.post('/innsertCategoryRec',categoryController.innsertCategoryRec);

routes.get('/view_category',categoryController.view_category);

routes.get('/deletcatRec/:id',categoryController.deletcatRec);

routes.post('/multDel',categoryController.multDel)

module.exports=routes;