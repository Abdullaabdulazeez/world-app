const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/currency/:code', async (req, res) => {
  try {
    const { code } = req.params;
    if (!code || typeof code !== 'string' || code.length < 2) {
      return res.status(400).json({ message: 'Invalid currency code' });
    }

    const response = await axios.get(`https://restcountries.com/v3.1/currency/${code}`);

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ message: 'No countries found for the given currency code' });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching country data:', error.message);
    if (error.response) {
      res.status(error.response.status).json({ message: error.response.data });
    } else if (error.request) {
      res.status(500).json({ message: 'No response received from the external API' });
    } else {
      res.status(500).json({ message: 'Error setting up the request' });
    }
  }
});

module.exports = router;
