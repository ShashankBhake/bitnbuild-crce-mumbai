const mongoose = require("mongoose");

const vendorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    company: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    productsSupplied: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "InventoryItem",
        },
    ],
});

const Vendors = mongoose.model("Vendors", vendorsSchema);

module.exports = Vendors;
