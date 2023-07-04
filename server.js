const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const memberRoutes = require('./routes/memberRoutes');
const authentication = require('./middleware/authentication');

const app = express();

// Connect to the database
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to the database'))
  .catch((error) => console.error('Database connection error:', error));

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Define routes
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/member', memberRoutes);
app.use('/login', authentication);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
