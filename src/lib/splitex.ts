import { last, first, isEmpty } from "lodash";

export interface IFirestoreEntity {
  id: string;
}

export interface IUser extends IFirestoreEntity {
  name: string;
}

export interface IExpense extends IFirestoreEntity {
  userId: string;
  amount: number;
}

export interface ITransaction {
  fromUserId: string;
  toUserId: string;
  amount: number;
}

export type IManualTransaction = ITransaction & IFirestoreEntity;

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
  usersDeposits: Record<string, number> = {};

  transactions: ITransaction[] = []; // Итоговые переводы
  manualTransactions: IManualTransaction[]; // Произведённые переводы, которые нужно учесть

  constructor(
    users: IUser[],
    expenses: IExpense[],
    transactions?: IManualTransaction[]
  ) {
    this.users = users;
    this.expenses = expenses;
    this.manualTransactions = transactions || [];

    this.totalCost = expenses.reduce((acc, { amount }) => acc + amount, 0);
    this.averageExpense = this.totalCost / users.length;

    this.calculateUsersDeposits();

    if (!isEmpty(this.usersDeposits)) {
      this.calculateTransactions();
    }
  }

  private calculateTransactions(): void {
    const bufferedDeposits: Record<string, number> = { ...this.usersDeposits };

    let sortedDeposits = this.mapDepositsIntoArray(bufferedDeposits);

    while (sortedDeposits.length >= 2) {
      const [toUserId, toAmount] = first(sortedDeposits) as [string, number];
      const [fromUserId, fromAmount] = last(sortedDeposits) as [string, number];

      const amount = Math.min(Math.abs(fromAmount), toAmount);

      bufferedDeposits[fromUserId] += amount;
      bufferedDeposits[toUserId] -= amount;

      this.transactions.push({ fromUserId, toUserId, amount });

      sortedDeposits = this.mapDepositsIntoArray(bufferedDeposits);
    }
  }

  private mapDepositsIntoArray(
    deposits: Record<string, number>
  ): Array<[string, number]> {
    return Object.entries(deposits)
      .filter(([, amount]) => amount !== 0)
      .sort((a, b) => b[1] - a[1]);
  }

  private calculateUsersDeposits(): void {
    this.users.forEach(
      ({ id }) =>
        (this.usersDeposits[id] =
          this.calculateTotalUserExpenses(id) - this.averageExpense)
    );

    this.manualTransactions.forEach(({ fromUserId, toUserId, amount }) => {
      this.usersDeposits[fromUserId] += amount;
      this.usersDeposits[toUserId] -= amount;
    });
  }

  private calculateTotalUserExpenses(userId: string): number {
    return this.expenses
      .filter((expence) => userId === expence.userId)
      .reduce((acc, { amount }) => acc + amount, 0);
  }
}
