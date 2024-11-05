// server/controllers/estimateController.js
const pool = require('../config/db');
const { createEstimate } = require('../controllers/estimateController');


// Calculate estimate based on selected areas
const calculateEstimate = (areas) => {
  const rates = {
    driveway: 0.15,
    curb: 0.1,
    walkway: 0.12,
    pool_area: 0.2,
    deck: 0.18,
  };
  const avgSquareFeet = {
    driveway: 200,
    curb: 100,
    walkway: 150,
    pool_area: 300,
    deck: 250,
  };

  let totalCost = 0;
  for (const area of areas) {
    if (rates[area]) {
      totalCost += avgSquareFeet[area] * rates[area];
    }
  }
  return totalCost;
};

// Controller function to create an estimate and store it in the database
exports.createEstimate = async (req, res) => {
  const { address, areas } = req.body;
  const estimatedCost = calculateEstimate(areas);

  try {
    const result = await pool.query(
      `INSERT INTO estimates (address, driveway, curb, walkway, pool_area, deck, estimated_cost)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        address,
        areas.includes('driveway'),
        areas.includes('curb'),
        areas.includes('walkway'),
        areas.includes('pool_area'),
        areas.includes('deck'),
        estimatedCost,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create estimate' });
  }
};
