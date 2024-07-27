const authService = require('../services/authService');

const register = async (req, res) => {
  const { name, email, password } = req.body; // Remove id from req.body
  try {
    const { id, user, token, balance } = await authService.register(name, email, password);
    res.json({ id, user, token, balance }); // Send the generated UUID along with user and token
  } catch (error) {
    console.error("Error in controller:", error); // Log error in controller
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.login(email, password);
    res.json({ user, token });
  } catch (error) {
    console.error("Error in controller:", error); // Log error in controller
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

module.exports = {
  register,
  login
};
