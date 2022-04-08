const mongoose = require("mongoose");

const car = new mongoose.Schema({
    fabricante: String,
    modelo: String,
    placa: String,
    valor: Number,
    caracteristicas: [],
    vendido: Boolean = false,
});

module.exports = car;