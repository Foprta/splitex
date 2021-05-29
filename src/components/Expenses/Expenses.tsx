import { createUsersMap } from "../../utils/utils";
import Expense from "./Expense";
import Transaction from "../Transactions/Transaction";
import { IManualTransaction } from "../../stores/manual-transactions.store";
import { IUser } from "../../stores/users.store";
import { IExpense } from "../../stores/expenses.store";
import { IExpenseSettings } from "../../stores/expenses-settings.store";

interface Props {
  groupId: string;
  users: IUser[];
  expenses: IExpense[];
  manualTransactions: IManualTransaction[];
  expensesSettings: IExpenseSettings[];
}

function Expenses({ groupId, users, expenses, manualTransactions, expensesSettings }: Props) {
  const usersMap = createUsersMap(users);

  return (
    <div className="flex flex-col divide-y-1 divide-gray-300">
      {expenses.map((expense) => {
        const expenseSettings = expensesSettings.filter(({ expenseId }) => expenseId === expense.id);

        return (
          <Expense
            key={expense.id}
            users={users}
            groupId={groupId}
            expense={expense}
            expenseSettings={expenseSettings}
            userName={usersMap[expense.userId]}
          />
        );
      })}
      {manualTransactions.map((transaction) => (
        <Transaction
          key={transaction.id}
          fromUser={usersMap[transaction.fromUserId]}
          toUser={usersMap[transaction.toUserId]}
          amount={transaction.amount}
          manual={true}
          groupId={groupId}
          transaction={transaction}
          users={users}
        />
      ))}
    </div>
  );
}

export default Expenses;
