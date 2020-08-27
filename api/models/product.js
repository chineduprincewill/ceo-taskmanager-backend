const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true},
    description: { type: String, required: false},
    price : { type: Number, required: true },
    manufacturer : { type: String, required: false},
    supplier: { type: String, required: false}
});

module.exports = mongoose.model('Product', productSchema);