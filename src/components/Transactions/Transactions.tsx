import { Splitex } from "../../lib/splitex";
import { createUsersMap } from "../../utils/utils";
import Transaction from "./Transaction";
import { IManualTransaction } from "../../stores/manual-transactions.store";
import { IUser } from "../../stores/users.store";
import { IExpense } from "../../stores/expenses.store";
import { IExpenseSettings } from "../../stores/expenses-settings.store";

interface Props {
  users: IUser[];
  expenses: IExpense[];
  manualTransactions: IManualTransaction[];
  expensesSettings: IExpenseSettings[];
}

function Transactions({ users, expenses, manualTransactions, expensesSettings }: Props) {
  const usersMap = createUsersMap(users);

  const splitex = new Splitex(users, expenses, manualTransactions, expensesSettings);

  return (
    <div className="divide-y-1 divide-black">
      {splitex.transactions.map((transaction, i) => (
        <Transaction
          key={i}
          fromUser={usersMap[transaction.fromUserId]}
          toUser={usersMap[transaction.toUserId]}
          amount={transaction.amount}
        />
      ))}
    </div>
  );
}

export default Transactions;
