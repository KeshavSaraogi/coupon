require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Hardcoded rewards
const rewardMap = {
  "ABC123": "🎉 You won ₹20!",
  "XYZ456": "🎊 You earned 50 points!",
  "HELLO789": "🎁 You get a surprise gift!",
};


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 MSG91 server running at http://localhost:${PORT}`);
});