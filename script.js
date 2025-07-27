const rewardMap = {
  "ABC123": "🎉 You won ₹20!",
  "XYZ456": "🎊 You earned 50 points!",
  "HELLO789": "🎁 You get a surprise gift!",
};

function redeem() {
  const phone = document.getElementById('phoneInput').value.trim();
  const code = document.getElementById('codeInput').value.trim().toUpperCase();
  const resultDiv = document.getElementById('result');

  if (!phone || !code) {
    resultDiv.textContent = "⚠️ Please enter both phone number and code.";
    resultDiv.style.color = 'orange';
    return;
  }

  if (rewardMap[code]) {
    resultDiv.textContent = rewardMap[code];
    resultDiv.style.color = 'green';

    // Simulate saving to "backend"
    console.log("📦 New Entry:");
    console.log({
      mobile_number: phone,
      code: code,
      reward: rewardMap[code],
      timestamp: new Date().toISOString(),
      is_redeemed: false,
    });

  } else {
    resultDiv.textContent = "❌ Invalid or expired code.";
    resultDiv.style.color = 'red';
  }
}
