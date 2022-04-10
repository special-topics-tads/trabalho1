const express = require('express');
const router = express.Router();

const carRouter = require('./carRouter');

router.use('/car', carRouter);

module.exports = router;
