const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const productRoutes = require('./models/product');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use('/api/products', productRoutes);
app.use(cors());
app.use(bodyParser.json());

//Authentication routes
app.use('/api/auth', authRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('E-commerce API is running.');
});

//Chat message routes
app.use('/api', messageRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
