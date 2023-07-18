const express = require('express');

const routes = express.Router();

const admincontroller = require('../controllers/admincontroller');

const Admin = require('../models/Admin');

const passport = require('passport');

routes.get('/',admincontroller.login);

routes.post('/logindata',passport.authenticate('local',{failureRedirect : "/"}),admincontroller.logindata)

routes.get('/Logout',passport.checkAuthenticatrduser,admincontroller.Logout);

routes.get('/password',passport.checkAuthenticatrduser,admincontroller.password);

routes.post('/modifypassword',passport.checkAuthenticatrduser,admincontroller.modifypassword);

routes.get('/profile',passport.checkAuthenticatrduser,admincontroller.profile);

routes.get('/readmore',passport.checkAuthenticatrduser,admincontroller.readmore);

routes.get('/dashborad',passport.checkAuthenticatrduser,admincontroller.dashborad);

routes.get('/views_admin',passport.checkAuthenticatrduser,admincontroller.viewadmin);

routes.get('/add_admin',passport.checkAuthenticatrduser,admincontroller.addadmin);

routes.post('/insartrecord',passport.checkAuthenticatrduser,Admin.uploadedAvatar,admincontroller.insartrecord);

routes.get('/deleterecord/:id',passport.checkAuthenticatrduser,admincontroller.deleterecord);


routes.post('/editrecord',passport.checkAuthenticatrduser,Admin.uploadedAvatar,admincontroller.editrecord);

routes.use('/user',passport.checkAuthenticatrduser, require('./userrouter'));

routes.use('/slider',passport.checkAuthenticatrduser, require('./sliderrouter'));

routes.use('/offer',passport.checkAuthenticatrduser, require('./offerrouter'));

routes.use('/photo',passport.checkAuthenticatrduser, require('./photorouter'));

routes.use('/review',passport.checkAuthenticatrduser, require('./reviewrouter'));

routes.use('/blog',passport.checkAuthenticatrduser, require('./blogrouter'));

routes.use('/comment',passport.checkAuthenticatrduser, require('./commentrouter'));

routes.use('/category',passport.checkAuthenticatrduser,require('./categoryrouter'));


module.exports = routes;
 