const mongoose = require('mongoose');

const path = require('path');

const AVATAR_PATH = '/uplodes/admins';

const multer = require('multer');

const AdminSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    gender : {
        type : String,
        require : true
    },
    hobby : {
        type : Array,
        require : true
    },
    city : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    }
});


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename : function(req,file,cb){
        cb(null, file.filename+'..'+Date.now())
    }
});

AdminSchema.statics.uploadedAvatar = multer({storage : storage}).single('image');
AdminSchema.statics.avatarPath = AVATAR_PATH;


const Admin = mongoose.model('Admin',AdminSchema);
module.exports = Admin;