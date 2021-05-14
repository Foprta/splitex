import { last, first, isEmpty } from "lodash";

export interface IUser {
  id: string;
  name: string;
}

export interface IExpense {
  id: string;
  userId: string;
  amount: number;
}

export interface ITransaction {
  fromUserId: string;
  toUserId: string;
  amount: number;
}

export class Splitex {
  users: IUser[]; // Юзеры группы
  expenses: IExpense[]; // Траты группы

  totalCost: number; // Сколько всего было потрачено
  averageExpense: number; // Траты на одного человека

  /**
   * "Депозиты" участников.
   *
   * Положительный депозит - сколько юзер должен получить
   * Отрицательный депозит - сколько юзер должен отправить
   */
  usersDeposits: Record<string, number>;

  transactions: ITransaction[] = []; // Итоговые переводы

  constructor(users: IUser[], expenses: IExpense[]) {
    this.users = users;
    this.expenses = expenses;

    this.totalCost = expenses.reduce((acc, { amount }) => acc + amount, 0);
    this.averageExpense = this.totalCost / users.length;

    this.usersDeposits = this.calculateUsersDeposits();
    if (!isEmpty(this.usersDeposits))
      this.transactions = this.calculateTransactions();
  }

  private calculateTransactions(): ITransaction[] {
    const result: ITransaction[] = [];

    const bufferedDeposits: Record<string, number> = { ...this.usersDeposits };

    let sortedDeposits = this.mapDepositsIntoArray(bufferedDeposits);

    while (sortedDeposits.length >= 2) {
      const [toUserId, toAmount] = first(sortedDeposits) as [string, number];
      const [fromUserId, fromAmount] = last(sortedDeposits) as [string, number];

      const amount = Math.min(Math.abs(fromAmount), toAmount);

      bufferedDeposits[fromUserId] += amount;
      bufferedDeposits[toUserId] -= amount;

      result.push({ fromUserId, toUserId, amount });

      sortedDeposits = this.mapDepositsIntoArray(bufferedDeposits);
    }

    return result;
  }

  private mapDepositsIntoArray(
    deposits: Record<string, number>
  ): Array<[string, number]> {
    return Object.entries(deposits)
      .filter(([, amount]) => amount !== 0)
      .sort((a, b) => b[1] - a[1]);
  }

  private calculateUsersDeposits(): Record<string, number> {
    const result: Record<string, number> = {};

    this.users.forEach(
      ({ id }) =>
        (result[id] = this.calculateTotalUserExpenses(id) - this.averageExpense)
    );

    return result;
  }

  private calculateTotalUserExpenses(userId: string): number {
    return this.expenses
      .filter((expence) => userId === expence.userId)
      .reduce((acc, { amount }) => acc + amount, 0);
  }
}
