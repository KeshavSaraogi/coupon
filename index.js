const express = require('express');
const axios = require('axios');
const rewardMap = require('./rewardMap');
const db = require('./database'); // optional DB logging

const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const { phone, code } = req.body;

    // 🔍 Validation
    if (!phone || !code) {
      return res.status(400).json({ message: "Phone and code are required." });
    }

    const upperCode = code.trim().toUpperCase();
    const reward = rewardMap[upperCode];

    if (!reward) {
      return res.status(400).json({ message: "❌ Invalid code." });
    }

    const message = `Thanks! ${reward}`;
    const mobile = `91${phone}`;

    // 💾 Optional: Save to database
    db.prepare(`
      INSERT INTO redemptions (phone, code, reward, timestamp, status)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      phone,
      upperCode,
      reward,
      new Date().toISOString(),
      'sent'
    );

    const payload = {
      flow_id: process.env.TEMPLATE_ID,
      sender: process.env.SENDER_ID,
      mobiles: mobile,
      VAR1: message
    };

    const headers = {
      authkey: process.env.MSG91_AUTH_KEY,
      'Content-Type': 'application/json'
    };

    await axios.post('https://control.msg91.com/api/v5/flow/', payload, { headers });

    console.log(`✅ SMS sent to ${phone}: ${reward}`);
    return res.status(200).json({ message: "SMS sent successfully!" });

  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
