import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface ListTransactionsDTO {
  transactions: Transaction[];
  balance: Balance;
}

export default class ListTransactionsService {
  private transactionRepository: TransactionsRepository;

  constructor(transactionRepository: TransactionsRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute(): ListTransactionsDTO {
    const transactions = this.transactionRepository.all();
    const balance = this.transactionRepository.getBalance();

    return {
      transactions,
      balance,
    };
  }
}
