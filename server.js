const express = require('express');
const path = require('path');
const cors = require('cors');
const open = require('open');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Enable JSON parsing and CORS for API calls
app.use(cors());
app.use(express.json());

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Example AI API route
app.post('/ai', async (req, res) => {
  try {
    const { prompt, location, cropType } = req.body;

    // Here you would call your AI service
    // For demo, we return dummy data
    const response = {
      risks: ['Moderate disease pressure', 'Optimal temperature', 'Adequate rainfall'],
      issues: ['Potential fungal infection', 'Slightly low soil moisture', 'pH may affect nutrients'],
      actions: ['Apply preventive fungicide', 'Increase irrigation', 'Test soil pH'],
      recommendation: 'Implement mulching, cover crops, and monitor weather for irrigation optimization.'
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server and open browser
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}`);
  try {
    await open(`http://localhost:${PORT}`);
  } catch (err) {
    console.log(`Open the browser manually at http://localhost:${PORT}`);
  }
});
