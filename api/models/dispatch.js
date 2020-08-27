const mongoose = require('mongoose');

const dispatchSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    stockid : { type: String, required: true},
    item : { type: String, required: true},
    batch : { type: String, required: true },
    quantity : { type: Number, required: true },
    staff : { type: String, required: true },
    dispatchdt : { type: Number , required: true},
    location : { type: String, required: true }
});

module.exports = mongoose.model('Dispatch', dispatchSchema);