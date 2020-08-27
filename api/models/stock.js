const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    item : { type: String, required: true},
    batch : { type: String, required: true },
    total : { type: Number, required: true },
    received : { type: Number, required: true },
    dispatched : { type: Number , required: true},
    balance : { type: Number, required: true },
    others : { type: String, required: false}
});

module.exports = mongoose.model('Stock', stockSchema);