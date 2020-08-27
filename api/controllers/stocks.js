const mongoose =  require('mongoose');
const Stock = require('../models/stock');

exports.stock_get_all = ( req, res, next ) => {
    Stock.find()
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

exports.create_stock = ( req, res, next ) => {
    
    const stock =  new Stock({
        _id : new mongoose.Types.ObjectId(),
        item : req.body.item,
        batch : req.body.batch,
        total : req.body.total,
        received : req.body.received,
        dispatched : req.body.dispatched,
        balance : req.body.balance,
        others : req.body.others
    });

    stock.save()
        .then( result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /stocks',
                createdStock: stock
            });
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({
                error : err
            });
        });
    
}


exports.get_stock_detail = (req, res, next) => {
    const id = req.params.stockId;
    Stock.findById(id)
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


exports.update_stock = (req, res, next) => {
    const id = req.params.stockId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Stock.update( { _id: id }, { $set: updateOps })
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


exports.delete_location = (req, res, next) => {
    const id = req.params.locationId;
    Location.remove({ _id : id})
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