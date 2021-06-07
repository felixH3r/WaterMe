const express = require('express');
const sensorController = require('../controller/sensor');
const plantsController = require('../controller/plants');
const usersController = require('../controller/users');
const dataController = require('../controller/data');

const router = express.Router();
router.post('/sensor', sensorController.createSensorData);
router.get('/sensor', sensorController.getSensorData);
router.post('/plants', plantsController.createPlants);
router.get('/plants', plantsController.getPlants);
router.get('/usersensors', usersController.getUserSensors);
router.get('/getplantdata', dataController.getPlantData);


module.exports = router;
