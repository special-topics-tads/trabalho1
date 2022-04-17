const mongoose = require('mongoose');

const car = new mongoose.Schema({
  fabricante: String,
  modelo: String,
  placa: String,
  valor: Number,
  caracteristicas: [],
  vendido: { type: Boolean, default: false },
  dataVenda: { type: Date, default: null },
});

module.exports = car;
