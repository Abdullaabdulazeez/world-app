const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');
const Favorite = require('../models/fav');
const router = express.Router();


router.post('/', authMiddleware, async (req, res) => {
  const { country } = req.body;
  const favorite = new Favorite({ user: req.user.id, country });
  await favorite.save();
  res.json(favorite);
});

router.get('/', authMiddleware, async (req, res) => {
  const favorites = await Favorite.find({ user: req.user.id });
  res.json(favorites);
});

module.exports = router;