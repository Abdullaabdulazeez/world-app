
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require('./routes/auth');
const country = require('./routes/countries');
const favRouter = require('./routes/fav');
const history = require('./routes/history');




const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error("Failed to connect to MongoDB", e);
  });



  app.get('/', (req, res) => {
    res.send('API is running...');
  });

  app.use('/api/auth', authRouter);
  app.use('/api/countries', country);
  app.use('/api/favorites', favRouter);
  app.use('/api/history', history);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("server is running at port 8080")
})