import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';
import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoryRepository = getRepository(Category);

    const { total } = await transactionRepository.getBalance();

    if (type === 'outcome' && total < value)
      throw new AppError('Unable to perform this transaction');

    const categoryAlreadyExists = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!categoryAlreadyExists) {
      const newCategory = categoryRepository.create({ title: category });
      await categoryRepository.save(newCategory);
    }

    const categoryId = await categoryRepository.findOne({
      where: { title: category },
    });

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: categoryId?.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
