const mongoose =  require('mongoose');
const Product = require('../models/product');

exports.get_all_products = ( req, res, next ) => {
    Product.find()
        .exec()
        .then( docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        })
}


exports.create_product = ( req, res, next ) => {
    
    const product =  new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        manufacturer: req.body.manufacturer,
        supplier : req.body.supplier
    });

    product.save()
        .then( result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /products',
                createdProduct: product
            });
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({
                error : err
            });
        });

    
}


exports.get_product_detail = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then( doc => {
            console.log("From Database ", doc);
            if(doc){
                res.status(200).json(doc);
            }
            else{
                res.status(404).json({
                    message : "No valid entry found for provided ID"
                });
            }
            
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({ error: err});
        })
}


exports.update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update( { _id: id }, { $set: updateOps })
        .exec()
        .then( result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}


exports.delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id : id})
        .exec()
        .then( result => {
            res.status(200).json(result);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error : err
            })
        });
}