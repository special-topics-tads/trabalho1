const mongoose = require('mongoose');
const carModel = require('../models/Car');
const Car = mongoose.model('Car', carModel);

module.exports = {
  async newCar(req, res) {
    try {
      const { fabricante, modelo, placa, valor, caracteristicas } = req.body;
      if (!fabricante || !modelo || !placa || !valor) {
        return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos' });
      } else {
        const car = new Car({ fabricante, modelo, placa, valor, caracteristicas });
        if (!(await car.save())) return res.status(400).json({ msg: 'Não foi possível cadastrar carro' });
        return res.status(200).json({ msg: 'Automovel adicionado ao estoque' });
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Erro de processo no servidor.' });
    }
  },

  async findAllCar(req, res) {
    try {
      const CarList = await Car.find();
      if (!CarList) {
        return res.status(400).json({ msg: 'Não há automoveis cadastrados' });
      } else {
        return res.status(200).json({ msg: 'Lista de automoveis cadastrados:', CarList });
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Erro de processo no servidor.'});
    }
  },

  async carSold(req, res){
    try{
      const _id = req.params;
      const car = await Car.findByIdAndUpdate(
        _id,
        { vendido: true }
      );
      if(!car || car.length === 0)
        return res.status(404).json({msg: "Carro não encontrado"});
      else 
        return res.json({msg : "Carro vendido com sucesso"});
      }catch(error){
        return res.status(500).json({msg : "Erro de processo no servidor."});
      }
  },

  async findAllCarSold(req, res) {
    try {
      const CarListSold = await Car.find({ vendido: true });
      if (!CarListSold) {
        return res.status(400).json({ msg: 'Não há automoveis vendidos' });
      } else {
        return res.status(200).json({ msg: 'Lista de automoveis vendidos.', CarListSold });
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Erro de processo no servidor.' });
    }
  },

  async findAllCarStorage(req, res) {
    try {
      const CarListStorage = await Car.find({ vendido: false });
      //const CarListSold = await Car.find().where('vendido').equals(false);
      if (!CarListStorage) {
        return res.status(400).json({ msg: 'Não há automoveis vendidos' });
      } else {
        return res.status(200).json({ msg: 'Lista de automoveis vendidos.', CarListStorage });
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Erro de processo no servidor.' });
    }
  },

  async deleteCarById(req, res){
    try{
      const _id = req.params;
      const car = await Car.findByIdAndDelete(_id);
      if(!car || car.length === 0)
        return res.status(404).json({msg: "Carro não encontrado"});
      else 
        return res.json({msg : "Carro excluido com sucesso",car});
      }catch(error){
        return res.status(500).json({msg : "Erro de processo no servidor."});
      }
  }
};
