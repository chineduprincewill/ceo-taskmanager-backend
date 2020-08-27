const mongoose =  require('mongoose');
const Dispatch = require('../models/dispatch');

exports.dispatch_get_all = ( req, res, next ) => {
    Dispatch.find()
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

exports.create_dispatch = ( req, res, next ) => {
    
    const dispatch =  new Dispatch({
        _id : new mongoose.Types.ObjectId(),
        stockid : req.body.stockid,
        item : req.body.item,
        batch : req.body.batch,
        quantity : req.body.quantity,
        staff : req.body.staff,
        dispatchdt : req.body.dispatchdt,
        location : req.body.location
    });

    dispatch.save()
        .then( result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /dispatches',
                createdDispatch: dispatch
            });
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({
                error : err
            });
        });
    
}


exports.get_stock_dispatches = (req, res, next) => {
    const id = req.params.stockid;
    Dispatch.find( { stockid: id} )
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