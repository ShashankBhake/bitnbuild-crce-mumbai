const mongoose = require('mongoose');

var societySchema = new mongoose.Schema({
    sr_no : {type : Number},
    name_of_society: {type : String},
    address : {type : String},
    state : { type : String },
    district : { type : String },
    dateOfRegistration : { type : Date },
    areaOfOperation : { type : String },
    sector_type : { type : String}
},{timestamps:true});

module.exports = mongoose.model('society', societySchema);