const express = require('express');
const router = express.Router();
//const mongoose =  require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Stock = require('../models/stock');
const StocksController = require('../controllers/stocks');

router.get('/', checkAuth, StocksController.stock_get_all);

router.post('/', checkAuth, StocksController.create_stock);

router.get('/:stockId', checkAuth, StocksController.get_stock_detail);

router.patch('/:stockId', checkAuth, StocksController.update_stock);

//router.delete('/:locationId', checkAuth, LocationsController.delete_location);

module.exports = router;

