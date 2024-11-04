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
  public weekday;
  public bestDay;

  constructor(transactions: Transaction[]) {
    this.transactions = transactions;
    this.total = this.setTotal();
    this.payment = this.setPayment();
    this.status = this.setStatus();
    this.weekday = this.setWeekday();
    this.bestDay = this.setBestDay();
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

  private setWeekday() {
    const weekday = {
      sunday: 0,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
    };

    for (let i = 0; i < this.transactions.length; i++) {
      const day = this.transactions[i].data.getDay();
      if (day === 0) weekday.sunday += 1;
      if (day === 1) weekday.monday += 1;
      if (day === 2) weekday.tuesday += 1;
      if (day === 3) weekday.wednesday += 1;
      if (day === 4) weekday.thursday += 1;
      if (day === 5) weekday.friday += 1;
      if (day === 6) weekday.saturday += 1;
    }

    return weekday;
  }

  private setBestDay() {
    return Object.entries(this.weekday).sort((a, b) => {
      return b[1] - a[1];
    })[0];
  }
}
