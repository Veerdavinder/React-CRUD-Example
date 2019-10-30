const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Business = new Schema({
    personName:{
        type:String
    },
    businessName:{
        type:String
    },
    businessGSTNumber:{
        type:Number
    }
},{
    collection:'crud'
});

module.exports = mongoose.model('Business',Business);