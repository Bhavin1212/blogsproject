const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/adminnode9');

const db = mongoose.connection;

db.once('open',(err)=> {
    if(err){
        console.log(err);
        return false;
    }
    console.log('Db is connected');
})

module.exports = db;