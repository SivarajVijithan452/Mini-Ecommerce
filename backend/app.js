const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Load environment variables from config.env file
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const products = require('./routes/product');
const orders = require('./routes/order');

connectDatabase();
app.use(express.json())
app.use(cors());
app.use('/api/v1/',products);
app.use('/api/v1/',orders);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} in ${NODE_ENV} mode`);
});