const transactionService = require('../services/transactionService');

const deposit = async (req, res) => {
  const { userId, amount, newBalance } = req.body;
  try {
    const result = await transactionService.deposit(userId, amount, newBalance);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const withdraw = async (req, res) => {
  const { userId, amount, newBalance } = req.body;
  try {
    const result = await transactionService.withdraw(userId, amount, newBalance);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getTransactionHistory = async (req, res) => {
  const { userId } = req.params;
  try {

    const transactions = await transactionService.getTransactionHistory(userId);

    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  deposit,
  withdraw,
  getTransactionHistory
};
