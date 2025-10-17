const SERVER_URL = "http://localhost:3000";

function addRow() {
  const table = document.getElementById("txBody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="text" placeholder="e.g. Description" /></td>
    <td><input type="number" placeholder="e.g. 500" /></td>
    <td><button class="btn-remove" onclick="removeRow(this)">🗑️</button></td>
  `;
  table.appendChild(row);
}

function removeRow(btn) {
  const row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

async function addBlock() {
  const projectName = document.getElementById("projectName").value;
  const budgetAmount = parseFloat(document.getElementById("budgetAmount").value);
  const rows = document.querySelectorAll("#txBody tr");

  const transactions = [];
  let totalSpent = 0;

  rows.forEach(row => {
    const desc = row.cells[0].querySelector("input").value.trim();
    const amount = parseFloat(row.cells[1].querySelector("input").value);
    if (desc && !isNaN(amount)) {
      transactions.push({ item: desc, cost: amount });
      totalSpent += amount;
    }
  });

  const remaining = budgetAmount - totalSpent;
  const status = remaining === 0 ? "Balanced ✅" : "Needs Review ⚠️";

  await fetch(`${SERVER_URL}/addBlock`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectName, budgetAmount, transactions, totalSpent, remaining, status })
  });

  loadBlocks();
}

async function loadBlocks() {
  const response = await fetch(`${SERVER_URL}/getBlocks`);
  const blocks = await response.json();

  const container = document.getElementById("blockchainDisplay");
  container.innerHTML = "";

  blocks.forEach(block => {
    const blockDiv = document.createElement("div");
    blockDiv.classList.add("block");

    blockDiv.innerHTML = `
      <h3>Project: ${block.projectName}</h3>
      <p><strong>Budget:</strong> ₱${block.budgetAmount}</p>
      <p><strong>Total Spent:</strong> ₱${block.totalSpent}</p>
      <p><strong>Remaining:</strong> ₱${block.remaining}</p>
      <p><strong>Status:</strong> ${block.status}</p>
      <h4>Transactions:</h4>
      <ul>${block.transactions.map(tx => `<li>${tx.item}: ₱${tx.cost}</li>`).join("")}</ul>
    `;

    if (block.status.includes("Needs Review")) {
      blockDiv.innerHTML += `
        <button class="vote-btn" onclick="vote(${block.id}, 'return')">Vote to Return</button>
        <button class="vote-btn" onclick="vote(${block.id}, 'reallocate')">Vote to Reallocate</button>
        <p>Votes → Return: ${block.votes.return} | Reallocate: ${block.votes.reallocate}</p>
      `;
    }

    container.appendChild(blockDiv);
  });
}

async function vote(id, type) {
  await fetch(`${SERVER_URL}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, type })
  });
  loadBlocks();
}

window.onload = loadBlocks;
