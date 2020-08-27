const mongoose =  require('mongoose');
const bcrypt =  require('bcrypt');
const jwt =  require('jsonwebtoken');

const User = require('../models/user');

exports.get_all_users = ( req, res, next ) => {
    User.find()
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


exports.create_user = ( req, res, next ) => {
    
    User.find({ email: req.body.email})
        .exec()
        .then( user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email already exists"
                })
            }
            else{
                
                bcrypt.hash(req.body.password, 10, ( err, hash ) => {
                    if (err) {
                        return res.status(500).json({
                            error : err
                        });
                    }
                    else{
                        const user =  new User({
                            _id : new mongoose.Types.ObjectId(),
                            email : req.body.email,
                            password : hash,
                            mobile: req.body.mobile,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            role: req.body.role
                        });
            
                        user.save()
                            .then( result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created',
                                    createdUser: user
                                });
                            })
                            .catch( err => {
                                console.log(err)
                                res.status(500).json({
                                    error : err
                                });
                            });
                    }
                });
            }   
        });
       
}


exports.get_user_detail = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
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


exports.update_user = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update( { _id: id }, { $set: updateOps })
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


exports.login_user = (req, res, next) => {

    User.find({ email: req.body.email})
        .exec()
        .then( user => {
            if(user.length < 1){
                return res.status(401).json({
                    message: "Incorrect email/password combination 1"
                });
            }

            bcrypt.compare( req.body.password, user[0].password, ( err, result ) => {
                if(err){
                    return res.status(401).json({
                        message: "Incorrect email/password combination 2"
                    });
                }

                if(result){
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        user: {
                            id: user[0]._id,
                            email: user[0].email,
                            mobile: user[0].mobile,
                            firstname: user[0].firstname,
                            lastname: user[0].lastname,
                            role: user[0].role
                        }
                    });
                }

                res.status(401).json({
                    message: "Incorrect email/password combination 3"
                });
            });
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                error : err
            })
        });
}


exports.delete_user = (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id : id})
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