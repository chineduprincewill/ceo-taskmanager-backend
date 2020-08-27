const express = require('express');
const app = express();
const morgan =  require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const taskRoutes =  require('./api/routes/tasks');
const locationRoutes = require('./api/routes/locations');
const  userRoutes = require('./api/routes/users');
const  scheduleRoutes = require('./api/routes/schedules');
const stockRoutes = require('./api/routes/stocks');
const dispatchRoutes = require('./api/routes/dispatches');

mongoose.connect('mongodb+srv://sparko:'+ process.env.MONGO_ATLAS_PW +'@cluster0-jsr1k.mongodb.net/test?retryWrites=true&w=majority', {
    useMongoClient: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
})

// Routes which should handle Requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/tasks', taskRoutes);
app.use('/locations', locationRoutes);
app.use('/users', userRoutes);
app.use('/schedules', scheduleRoutes);
app.use('/stocks', stockRoutes);
app.use('/dispatches', dispatchRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    })
})

module.exports = app;