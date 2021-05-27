import { first, isEmpty, last } from "lodash";
import { IManualTransaction, ITransaction } from "../stores/manual-transactions.store";
import { IExpense } from "../stores/expenses.store";
import { IUser } from "../stores/users.store";
import { IExpenseSettings } from "../stores/expenses-settings.store";

export class Splitex {
  users: IUser[] = []; // Юзеры группы
  expenses: IExpense[] = []; // Траты
  expensesSettings: IExpenseSettings[] = []; // Траты группы

  totalCost = 0; // Сколько всего было потрачено
  averageExpense = 0; // Траты на одного человека

  /**
   * "Депозиты" участников.
   *
   * Положительный депозит - сколько юзер должен получить
   * Отрицательный депозит - сколько юзер должен отправить
   */
  usersDeposits: Record<string, number> = {};

  transactions: ITransaction[] = []; // Итоговые переводы
  manualTransactions: IManualTransaction[] = []; // Произведённые переводы, которые нужно учесть

  constructor(
    users: IUser[],
    expenses: IExpense[],
    manualTransactions: IManualTransaction[] = [],
    expensesSettings: IExpenseSettings[] = []
  ) {
    if (users.length < 1 || expenses.length < 1) {
      return;
    }

    this.users = users;
    this.expenses = expenses;
    this.manualTransactions = manualTransactions;
    this.expensesSettings = expensesSettings;

    this.totalCost = expenses.reduce((acc, { amount }) => acc + amount, 0);

    this.averageExpense = this.totalCost / users.reduce((acc, { proportion }) => acc + proportion, 0);

    this.calculateUsersDeposits();

    if (!isEmpty(this.usersDeposits)) {
      this.calculateTransactions();
    }
  }

  private calculateTransactions(): void {
    const bufferedDeposits: Record<string, number> = { ...this.usersDeposits };

    let sortedDeposits = this.mapDepositsIntoArray(bufferedDeposits);

    while (sortedDeposits.length >= 2) {
      if (this.transactions.length > this.users.length) break;

      const [toUserId, toAmount] = first(sortedDeposits) as [string, number];
      const [fromUserId, fromAmount] = last(sortedDeposits) as [string, number];

      const amount = Math.min(Math.abs(fromAmount), toAmount);

      bufferedDeposits[fromUserId] += amount;
      bufferedDeposits[toUserId] -= amount;

      this.transactions.push({ fromUserId, toUserId, amount });

      sortedDeposits = this.mapDepositsIntoArray(bufferedDeposits);
    }
  }

  private mapDepositsIntoArray(deposits: Record<string, number>): Array<[string, number]> {
    return Object.entries(deposits)
      .filter(([, amount]) => amount !== 0)
      .sort((a, b) => b[1] - a[1]);
  }

  private calculateUsersDeposits(): void {
    this.users.forEach(
      (user) =>
        (this.usersDeposits[user.id] = this.calculateTotalUserExpenses(user.id) - this.calculateTotalUserConsumes(user))
    );

    this.manualTransactions.forEach(({ fromUserId, toUserId, amount }) => {
      this.usersDeposits[fromUserId] += amount;
      this.usersDeposits[toUserId] -= amount;
    });
  }

  private calculateTotalUserConsumes(user: IUser): number {
    return this.expenses.reduce((acc, expense) => {
      const allProportions = this.users.reduce(
        (acc, { proportion, id }) =>
          acc +
          proportion *
            (this.expensesSettings.find(({ expenseId, userId }) => expenseId === expense.id && userId === id)
              ?.proportion ?? 1),
        0
      );

      const expenseAmount = this.expensesSettings
        .filter((settings) => settings.expenseId === expense.id)
        .reduce((acc, { personal }) => acc - (personal ?? 0), expense.amount);

      const settings = this.expensesSettings.find(
        ({ expenseId, userId }) => expenseId === expense.id && userId === user.id
      );

      const userPersonal =
        this.expensesSettings.find(({ userId, expenseId }) => user.id === userId && expense.id === expenseId)
          ?.personal ?? 0;

      return userPersonal + acc + (expenseAmount / allProportions) * (settings?.proportion ?? 1) * user.proportion;
    }, 0);
  }

  private calculateTotalUserExpenses(userId: string): number {
    return this.expenses.filter((expence) => userId === expence.userId).reduce((acc, { amount }) => acc + amount, 0);
  }
}
