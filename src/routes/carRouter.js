const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.post('/newCar', carController.newCar);
router.get('/findAllCar', carController.findAllCar);
router.get('/findAllCarSold', carController.findAllCarSold);
router.get('/findAllCarStorage', carController.findAllCarStorage);
router.delete('/deleteCarById/:_id',carController.deleteCarById);
module.exports = router;
