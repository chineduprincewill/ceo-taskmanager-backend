const express = require('express');
const router = express.Router();
//const mongoose =  require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Schedule = require('../models/schedule');
const SchedulesController = require('../controllers/schedules');

router.get('/', checkAuth, SchedulesController.schedules_get_all);

router.post('/', checkAuth, SchedulesController.create_schedule);

//router.get('/:locationId', checkAuth, LocationsController.get_location_detail);

//router.patch('/:locationId', checkAuth, LocationsController.update_location);

//router.delete('/:locationId', checkAuth, LocationsController.delete_location);

module.exports = router;

