const express = require('express');
const router = express.Router();
//const mongoose =  require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Dispatch = require('../models/product');
const ProductsController = require('../controllers/products');

router.get('/', checkAuth, ProductsController.get_all_products);

router.post('/', checkAuth, ProductsController.create_product);

router.get('/:productId', checkAuth, ProductsController.get_product_detail);

router.patch('/:productId', checkAuth, ProductsController.update_product);

router.delete('/:productId', checkAuth, ProductsController.delete_product);

module.exports = router;

