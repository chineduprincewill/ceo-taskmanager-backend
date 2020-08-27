const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    address : { type: String, required: true},
    city : { type: String, required: true },
    state : { type: String, required: true },
    country : { type: String, required: true }
});

module.exports = mongoose.model('Location', locationSchema);