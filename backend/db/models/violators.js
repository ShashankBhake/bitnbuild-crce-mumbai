const mongoose = require('mongoose'),
    Schema = mongoose.Schema


var violatorSchema = new mongoose.Schema(
    {
        violatorName: String,
        violatorType: String,
        drivingLicense: String,
        vehicleType: String,
        registrationNumber: String,
        vehicleColor: String,
        dateTime: Date,
        location: String,
        others: String,
    },
    { timestamps: true }
)

module.exports = mongoose.model('violator', violatorSchema)
