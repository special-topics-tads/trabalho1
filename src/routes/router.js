const express = require('express');
const router = express.Router();
const carController = require("../controllers/carController");

router.post("/newCar", carController.newCar);
router.post("/findAllCar", carController.findAllCar);
router.post("/findAllCarSold", carController.findAllCarSold);
router.post("/findAllCarStorage", carController.findAllCarStorage);

module.exports = router;
