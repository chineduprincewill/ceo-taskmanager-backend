const express = require('express');
const router = express.Router();
//const mongoose =  require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Location = require('../models/location');
const LocationsController = require('../controllers/locations');

router.get('/', checkAuth, LocationsController.locations_get_all);

router.post('/', checkAuth, LocationsController.create_location);

router.get('/:locationId', checkAuth, LocationsController.get_location_detail);

router.patch('/:locationId', checkAuth, LocationsController.update_location);

router.delete('/:locationId', checkAuth, LocationsController.delete_location);

module.exports = router;

