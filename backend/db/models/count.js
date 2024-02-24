const mongoose = require('mongoose');

var visitorCount = new mongoose.Schema(
  {
    count : Number
  },
  { timestamps: true }
);


module.exports.visitorCount = mongoose.model('visitors', visitorCount);

