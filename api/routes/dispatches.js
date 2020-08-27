const express = require('express');
const router = express.Router();
//const mongoose =  require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Dispatch = require('../models/dispatch');
const DispatchesController = require('../controllers/dispatches');

router.get('/', checkAuth, DispatchesController.dispatch_get_all);

router.post('/', checkAuth, DispatchesController.create_dispatch);

router.get('/:stockid', checkAuth, DispatchesController.get_stock_dispatches);

//router.patch('/:stockId', checkAuth, StocksController.update_stock);

//router.delete('/:locationId', checkAuth, LocationsController.delete_location);

module.exports = router;

