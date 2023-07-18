const express = require('express');

const routes = express.Router();

const slider = require('../models/slidermodel');

const slidercontroller = require('../controllers/slidercontroller');

routes.get('/', slidercontroller.addslider)

routes.get('/views_slider', slidercontroller.viewslider)

routes.post('/insertslider', slider.uploadavatar, slidercontroller.insertslider);

routes.get('/deleterecord/:id', slidercontroller.deleterecord);

routes.get('/updaterecord', slidercontroller.updaterecord);

routes.post('/editslider', slider.uploadavatar, slidercontroller.editslider);

routes.post('/mulDel', slidercontroller.mulDel);


module.exports = routes;