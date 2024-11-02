import countBy from "./countBy.js";

type TransactionValue = Transaction & { value: number };

function filterValue(
  transaction: Transaction
): transaction is TransactionValue {
  return transaction.value !== null;
}

export default class Statistics {
  private transactions;
  public total;
  public payment;
  public status;

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
    this.total = this.setTotal();
    this.payment = this.setPayment();
    this.status = this.setStatus();
  }

  private setTotal() {
    return this.transactions.filter(filterValue).reduce((acc, item) => {
      return acc + item.value;
    }, 0);
  }

  private setPayment() {
    return countBy(this.transactions.map(({ payment }) => payment));
  }

  private setStatus() {
    return countBy(this.transactions.map(({ status }) => status));
  }
}
