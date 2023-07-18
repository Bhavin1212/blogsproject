const express = require('express');

const routes = express.Router();

const review = require('../models/reviewmodel');

const reviewcontroller = require('../controllers/reviewcontroller');

routes.get('/add_review', reviewcontroller.add_review);

routes.post('/insertreview', reviewcontroller.insertreview);

routes.get('/views_review', reviewcontroller.views_review);

routes.get('/deleterecord/:id', reviewcontroller.deleterecord);

routes.get('/updaterecord', reviewcontroller.updaterecord);

routes.post('/editreview', reviewcontroller.editreview);

routes.post('/mulDel', reviewcontroller.mulDel);



module.exports = routes