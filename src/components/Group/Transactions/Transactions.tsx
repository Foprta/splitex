import {
  IExpense,
  IManualTransaction,
  IUser,
  Splitex,
} from "../../../lib/splitex";
import { createUsersMap } from "../../../utils/utils";
import Transaction from "./Transaction";

interface Props {
  users: IUser[];
  expenses: IExpense[];
  manualTransactions: IManualTransaction[];
}

function Transactions({ users, expenses, manualTransactions }: Props) {
  const usersMap = createUsersMap(users);

  const splitex = new Splitex(users, expenses, manualTransactions);

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
