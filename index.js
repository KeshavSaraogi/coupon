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

app.post('/send', async (req, res) => {
  const { phone, code } = req.body;
  const reward = rewardMap[code.toUpperCase()];

  if (!reward) {
    return res.status(400).json({ message: "❌ Invalid code." });
  }

  const message = `Thanks! ${reward}`;

  try {
    await axios.post(`https://control.msg91.com/api/v5/flow/`, {
      flow_id: process.env.TEMPLATE_ID,
      sender: process.env.SENDER_ID,
      mobiles: `91${phone}`,
      VAR1: message, // VAR1 is your placeholder in the SMS template
    }, {
      headers: {
        authkey: process.env.MSG91_AUTH_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ SMS sent to ${phone}: ${message}`);
    res.status(200).json({ message: "SMS sent successfully!" });
  } catch (err) {
    console.error("❌ SMS Error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to send SMS." });
  }
});


const PORT = 5500;
app.listen(PORT, () => {
  console.log(`🚀 MSG91 server running at http://localhost:${PORT}`);
});