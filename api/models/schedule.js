const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    description : { type: String, required: true},
    location : { type: String, required: true },
    from : { type: Number, required: true },
    to : { type: Number, required: true }
});

module.exports = mongoose.model('Schedule', scheduleSchema);