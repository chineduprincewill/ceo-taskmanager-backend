const mongoose =  require('mongoose');
const Schedule = require('../models/schedule');

exports.schedules_get_all = ( req, res, next ) => {
    Schedule.find()
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

exports.create_schedule = ( req, res, next ) => {
    
    const schedule =  new Schedule({
        _id : new mongoose.Types.ObjectId(),
        description : req.body.description,
        location : req.body.location,
        from : req.body.from,
        to : req.body.to
    });

    schedule.save()
        .then( result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /schedules',
                createdSchedule: schedule
            });
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({
                error : err
            });
        });
    
}


exports.get_location_detail = (req, res, next) => {
    const id = req.params.locationId;
    Location.findById(id)
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


exports.update_location = (req, res, next) => {
    const id = req.params.locationId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Location.update( { _id: id }, { $set: updateOps })
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