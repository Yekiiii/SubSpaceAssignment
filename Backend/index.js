require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
