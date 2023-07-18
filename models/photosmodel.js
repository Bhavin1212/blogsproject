const mongoose = require('mongoose');

const path = require('path');

const photopath = "/uplodes/photoimg";

const multer = require('multer');

const photoSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.join(__dirname, '..', photopath))
    },
    filename: (req, file, cd) => {
        cd(null, file.fieldname + "-" + Date.now())
    }
});

photoSchema.statics.uploadavatar = multer({ storage: storage }).single('image');
photoSchema.statics.photopath = photopath;

const photo = mongoose.model('photo', photoSchema);
module.exports = photo;