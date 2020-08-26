import { empty } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const incomeTypes = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const incomeValue = incomeTypes.reduce((previous, next) => {
      const transaction: Transaction = {
        id: previous.id,
        title: previous.title,
        type: previous.type,
        value: previous.value + next.value,
      };
      return transaction;
    });

    const outcomeTypes = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const outcomeValue = outcomeTypes.reduce(
      (previous, next) => {
        const transaction: Transaction = {
          id: previous.id,
          title: previous.title,
          type: previous.type,
          value: previous.value + next.value,
        };
        return transaction;
      },
      {
        id: '',
        title: '',
        type: 'outcome',
        value: 0,
      },
    );

    const balance: Balance = {
      income: incomeValue.value,
      outcome: outcomeValue.value,
      total: incomeValue.value - outcomeValue.value,
    };

    return balance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const count = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(count);

    return count;
  }
}

export default TransactionsRepository;
