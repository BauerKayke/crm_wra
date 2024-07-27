"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Transaction = require('../models/Transaction'); var _Transaction2 = _interopRequireDefault(_Transaction);

class TransactionController {
  async store(req, res) {
    try {
      const { id, additional_fields } = req.body;

      // Verificar se foi fornecido um id para a criação
      if (id) {
        return res.status(400).json({ errors: ['ID should not be provided for creating new transactions.'] });
      }

      // Verificar se additional_fields é um JSON válido, se necessário
      if (additional_fields && typeof additional_fields !== 'object') {
        return res.status(400).json({ errors: ['Additional fields must be a valid JSON object.'] });
      }

      const transaction = await _Transaction2.default.create(req.body);
      return res.status(201).json({ message: 'Transaction created successfully.', transaction });
    } catch (e) {
      console.error('Error creating transaction:', e);
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }

  async index(req, res) {
    try {
      const transactions = await _Transaction2.default.findAll();
      return res.status(200).json(transactions);
    } catch (e) {
      console.error('Error fetching transactions:', e);
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }

  async show(req, res) {
    try {
      const transaction = await _Transaction2.default.findByPk(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      return res.status(200).json(transaction);
    } catch (e) {
      console.error('Error fetching transaction:', e);
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }

  async update(req, res) {
    try {
      const transaction = await _Transaction2.default.findByPk(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      const updatedTransaction = await transaction.update(req.body);
      return res.status(200).json(updatedTransaction);
    } catch (e) {
      console.error('Error updating transaction:', e);
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }

  async delete(req, res) {
    try {
      const transaction = await _Transaction2.default.findByPk(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      await transaction.destroy();
      return res.status(204).json();
    } catch (e) {
      console.error('Error deleting transaction:', e);
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }
}

exports. default = new TransactionController();
