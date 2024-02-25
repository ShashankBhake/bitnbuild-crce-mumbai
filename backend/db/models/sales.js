const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InventoryItem",
        required: true,
    },
    quantitySold: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    saleDate: {
        type: Date,
        default: Date.now,
    },
});

const Sales = mongoose.model("Sales", salesSchema);

module.exports = Sales;
