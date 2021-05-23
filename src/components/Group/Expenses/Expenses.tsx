import { IExpense, IManualTransaction, IUser } from "../../../lib/splitex";
import { createUsersMap } from "../../../utils/utils";
import Expense from "./Expense";
import Transaction from "../Transactions/Transaction";

interface Props {
  groupId: string;
  users: IUser[];
  expenses: IExpense[];
  manualTransactions: IManualTransaction[];
}

function Expenses({ groupId, users, expenses, manualTransactions }: Props) {
  const usersMap = createUsersMap(users);

  return (
    <div className="flex flex-col divide-y-1 divide-black">
      {expenses.map((expense) => (
        <Expense
          key={expense.id}
          groupId={groupId}
          expense={expense}
          userName={usersMap[expense.userId]}
        />
      ))}
      {manualTransactions.map((transaction, i) => (
        <Transaction
          key={i}
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
