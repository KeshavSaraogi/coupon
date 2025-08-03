async function fetchRedemptions() {
  try {
    const response = await fetch('/api/redemptions');
    const data = await response.json();

    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = "";

    if (data.length === 0) {
      tbody.innerHTML = "<tr><td colspan='6'>No redemptions yet.</td></tr>";
      return;
    }

    data.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.id}</td>
        <td>${entry.phone}</td>
        <td>${entry.code}</td>
        <td>${entry.reward}</td>
        <td>${new Date(entry.timestamp).toLocaleString()}</td>
        <td>${entry.status}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("❌ Failed to fetch redemptions:", err);
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = "<tr><td colspan='6'>Error loading data.</td></tr>";
  }
}

fetchRedemptions();
