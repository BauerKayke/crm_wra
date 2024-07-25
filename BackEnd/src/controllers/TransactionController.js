import Transaction from '../models/Transaction';

class TransactionController {
  async store(req, res) {
    try {
      const transaction = await Transaction.create(req.body);
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
      const transactions = await Transaction.findAll();
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
      const transaction = await Transaction.findByPk(req.params.id);
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
      const transaction = await Transaction.findByPk(req.params.id);
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
      const transaction = await Transaction.findByPk(req.params.id);
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

export default new TransactionController();
