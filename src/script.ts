import fetchData from "./fetchData.js";
import normalizeTransaction from "./normalizeTransaction.js";

async function handleData() {
  const data = await fetchData<TransactionAPI[]>(
    "https://api.origamid.dev/json/transacoes.json?"
  );

  if (!data) return;

  const transactions = data.map(normalizeTransaction);
}
handleData();
