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
      return res.status(500).json({ msg: 'Erro de processo no servidor. ' + error });
    }
  },

  async updateCar(req, res) {
    try {
      const _id = req.params;
      const carParam = req.body;
      const car = await Car.findByIdAndUpdate(_id, {
        fabricante: carParam.fabricante,
        modelo: carParam.modelo,
        placa: carParam.placa,
        valor: carParam.valor,
        caracteristicas: carParam.caracteristicas,
      });
      if (!car || car.length === 0) return res.status(404).json({ msg: 'Carro não encontrado' });
      else return res.json({ msg: 'Carro atualizado com sucesso!' });
    } catch (error) {
      return res.status(400).json({ msg: 'Campos não preenchidos!' });
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
      return res.status(500).json({ msg: 'Erro de processo no servidor.' });
    }
  },

  async carSold(req, res) {
    try {
      const _id = req.params;
      const car = await Car.findByIdAndUpdate(_id, { vendido: true, dataVenda: new Date() });
      if (!car || car.length === 0) return res.status(404).json({ msg: 'Carro não encontrado' });
      else return res.json({ msg: 'Carro vendido com sucesso' });
    } catch (error) {
      return res.status(500).json({ msg: 'Erro de processo no servidor.' });
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
      if (!CarListStorage) {
        return res.status(400).json({ msg: 'Não há automoveis vendidos' });
      } else {
        return res.status(200).json({ msg: 'Lista de automoveis vendidos.', CarListStorage });
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Erro de processo no servidor.' });
    }
  },

  async findAllCarSales(req, res) {
    try {
      const { _startDate, _endDate } = req.body;
      const CarListStorage = await Car.find({
        vendido: true,
        dataVenda: {
          $gte: new Date(_startDate),
          $lt: new Date(_endDate),
        },
      });

      if (!CarListStorage) {
        return res.status(400).json({ msg: 'Não há automoveis vendidos' });
      } else {
        const totalCarrosVendidos = CarListStorage.length;
        const totalValorVendas = CarListStorage.reduce((n, { valor }) => n + valor, 0);

        const response = {
          totalCarrosVendidos: totalCarrosVendidos,
          valorAcumuladoVendas: totalValorVendas,
        };
        return res.status(200).json({ msg: 'Relatório de vendas', response });
      }
    } catch (error) {
      return res.status(500).json({ msg: 'Erro de processo no servidor.' });
    }
  },

  async deleteCarById(req, res) {
    try {
      const _id = req.params;
      const car = await Car.findByIdAndDelete(_id);
      if (!car || car.length === 0) return res.status(404).json({ msg: 'Carro não encontrado' });
      else return res.json({ msg: 'Carro excluido com sucesso', car });
    } catch (error) {
      return res.status(500).json({ msg: 'Erro de processo no servidor.' });
    }
  },
};
