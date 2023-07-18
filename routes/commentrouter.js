const express = require('express');

const router = express.Router();

const controller = require('../controllers/commentcontroller');

router.post('/com_insert', controller.com_insert);

router.get('/views_comment',controller.views_comment);


module.exports = router;