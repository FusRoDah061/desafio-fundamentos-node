import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((total, currentTransaction) => {
      return (
        total +
        (currentTransaction.type === 'income' ? currentTransaction.value : 0.0)
      );
    }, 0.0);

    const outcome = this.transactions.reduce((total, currentTransaction) => {
      return (
        total +
        (currentTransaction.type === 'outcome' ? currentTransaction.value : 0.0)
      );
    }, 0.0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
