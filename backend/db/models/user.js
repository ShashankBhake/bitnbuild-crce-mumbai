const mongoose = require('mongoose'),
    Schema = mongoose.Schema


var userSchema = new mongoose.Schema(
    {
        username: String,
        employeeCode: String,
        password: String,
        role: {
            type : String,
            enum : ['TCA', 'TCT', 'MRFT', 'ADMIN'],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('user', userSchema)
