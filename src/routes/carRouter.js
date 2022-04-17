const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.post('/newCar', carController.newCar);
router.put('/updateCar/:_id', carController.updateCar);
router.get('/findAllCar', carController.findAllCar);
router.patch('/carSold/:_id', carController.carSold);
router.get('/findAllCarSold', carController.findAllCarSold);
router.get('/findAllCarStorage', carController.findAllCarStorage);
router.get('/findAllCarSales/start/_startDate/end/_endDate', carController.findAllCarSales);
router.delete('/deleteCarById/:_id',carController.deleteCarById);
module.exports = router;
