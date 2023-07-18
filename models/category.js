const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    isActive:{
        type:Boolean,
        require:true
    },
    createdAt :{
        type:String,
        require : true
    },
    updatedAt :{
        type : String,
        require : true
    }
},{
    timestamps : true
});

const category = mongoose.model('category', CategorySchema);
module.exports = category;