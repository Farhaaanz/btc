const form = document.getElementById('budget-form');
const summary = document.getElementById('summary');

// Replace with your deployed Apps Script Web App URL
const apiUrl = 'https://script.google.com/macros/s/AKfycby1iD80Q4irbS62XCy2XJ2VfinhSQ8wm5pYc2bp56M61STF5tCZQ-wqegZaRYtUmG2mpg/exec';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    date: document.getElementById('date').value,
    description: document.getElementById('description').value,
    category: document.getElementById('category').value,
    amount: parseFloat(document.getElementById('amount').value),
    type: document.getElementById('type').value
  };

  try {
    await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    form.reset();
    loadData();
  } catch (error) {
    alert("Failed to send data: " + error.message);
  }
});

async function loadData() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    let income = 0, expense = 0;
    for (let i = 1; i < data.length; i++) {
      const amount = parseFloat(data[i][3]);
      const type = data[i][4];
      if (type === 'Income') income += amount;
      else if (type === 'Expense') expense += amount;
    }

    const balance = income - expense;
    summary.innerText = `Income: ৳${income.toFixed(2)} | Expense: ৳${expense.toFixed(2)} | Balance: ৳${balance.toFixed(2)}`;
  } catch (error) {
    summary.innerText = 'Failed to load data.';
  }
}

loadData();
