const express = require('express');

const routes = express.Router();

const offer = require('../models/offermodel');

const offercontroller = require('../controllers/offercontroller');

routes.get('/add_offer', offercontroller.add_offer)

routes.post('/insertoffer',offercontroller.insertoffer);

routes.get('/views_offer', offercontroller.views_offer);

routes.get('/deleterecord/:id', offercontroller.deleterecord);

routes.get('/updaterecord', offercontroller.updaterecord);

routes.post('/updatetoffer', offercontroller.updatetoffer);

routes.post('/mulDel', offercontroller.mulDel);

module.exports = routes;