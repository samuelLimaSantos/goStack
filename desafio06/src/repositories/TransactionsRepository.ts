/* eslint-disable no-param-reassign */
import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const allTransaction = await this.find();

    const balance = allTransaction.reduce(
      (accumulate: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulate.income += transaction.value;
            break;
          case 'outcome':
            accumulate.outcome += transaction.value;
            break;
          default:
            break;
        }

        return accumulate;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    balance.total = balance.income - balance.outcome;

    return balance;
  }
}

export default TransactionsRepository;
