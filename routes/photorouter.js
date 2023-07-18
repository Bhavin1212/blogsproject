const express = require('express');

const routes = express.Router();

const photocontroller = require('../controllers/photocontroller');

const photo = require('../models/photosmodel');

routes.get('/add_photos', photocontroller.add_photos);

routes.post('/insertphoto', photo.uploadavatar, photocontroller.insertphoto);

routes.get('/views_photo', photocontroller.viewphoto);

routes.get('/deleterecord/:id', photocontroller.deleterecord);

routes.get('/updaterecord', photocontroller.updaterecord);

routes.post('/editphoto', photo.uploadavatar, photocontroller.editphoto);

routes.post('/mulDel', photocontroller.mulDel);

module.exports = routes;