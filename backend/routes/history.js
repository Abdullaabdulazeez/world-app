const express = require('express');
const SearchHistory = require('../models/history');
const authMiddleware = require('../middleware/authmiddleware');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { search } = req.body;
  let history = await SearchHistory.findOne({ user: req.user.id });
  if (!history) {
    history = new SearchHistory({ user: req.user.id, searches: [search] });
  } else {
    history.searches = [search, ...history.searches.filter(s => s !== search)].slice(0, 5);
  }
  await history.save();
  res.json(history);
});

router.get('/', authMiddleware, async (req, res) => {
  const history = await SearchHistory.findOne({ user: req.user.id });
  res.json(history ? history.searches : []);
});

module.exports = router;