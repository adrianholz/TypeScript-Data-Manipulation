import fetchData from "./fetchData.js";
import normalizeTransaction from "./normalizeTransaction.js";
import Statistics from "./Statistics.js";

async function handleData() {
  const data = await fetchData<TransactionAPI[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );

  if (!data) return;

  const transactions = data.map(normalizeTransaction);
  fillTable(transactions);
  fillStatistics(transactions);
}

function fillStatistics(transactions: Transaction[]): void {
  const data = new Statistics(transactions);
  const totalElement = document.querySelector<HTMLSpanElement>("#total span");
  if (totalElement) {
    totalElement.innerText = data.total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
}

function fillTable(transactions: Transaction[]): void {
  const table = document.querySelector("#transactions tbody");

  if (!table) return;

  transactions.forEach((transaction) => {
    table.innerHTML += `
      <tr>
        <td>${transaction.name}</td>
        <td>${transaction.email}</td>
        <td>$${transaction.currency}</td>
        <td>${transaction.payment}</td>
        <td>${transaction.status}</td>
      </tr>
    `;
  });
}

handleData();
