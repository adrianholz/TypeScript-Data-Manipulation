type TransactionValue = Transaction & { value: number };

function filterValue(
  transaction: Transaction
): transaction is TransactionValue {
  return transaction.value !== null;
}

export default class Statistics {
  private transactions;
  public total;

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
    this.total = this.setTotal();
  }

  private setTotal() {
    return this.transactions.filter(filterValue).reduce((acc, item) => {
      return acc + item.value;
    }, 0);
  }
}
