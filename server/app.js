// server/app.js
const express = require('express');
const cors = require('cors');
const estimateRoutes = require('./routes/estimateRoutes');  // Make sure this line appears only once
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Define the route only once
app.use('/api', estimateRoutes);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
