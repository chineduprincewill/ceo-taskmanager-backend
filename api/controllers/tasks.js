const mongoose =  require('mongoose');
const Task = require('../models/task');

exports.get_all_tasks = ( req, res, next ) => {
    Task.find()
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


exports.create_task = ( req, res, next ) => {
    
    const task =  new Task({
        _id : new mongoose.Types.ObjectId(),
        title : req.body.title,
        description : req.body.description,
        payment : req.body.payment
    });

    task.save()
        .then( result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling POST requests to /tasks',
                createdTask: task
            });
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({
                error : err
            });
        });

    
}


exports.get_task_detail = (req, res, next) => {
    const id = req.params.taskId;
    Task.findById(id)
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


exports.update_task = (req, res, next) => {
    const id = req.params.taskId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Task.update( { _id: id }, { $set: updateOps })
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


exports.delete_task = (req, res, next) => {
    const id = req.params.taskId;
    Task.remove({ _id : id})
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