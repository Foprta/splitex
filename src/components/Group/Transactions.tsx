import { IExpense, IUser, Splitex } from "../../lib/splitex";
import Money from "../UI/Money";
import { createUsersMap } from "../../utils/utils";

interface Props {
  users: IUser[];
  expenses: IExpense[];
}

function Transactions({ users, expenses }: Props) {
  const usersMap = createUsersMap(users);

  const splitex = new Splitex(users, expenses);

  return (
    <div className="divide-y-1 divide-black">
      {splitex.transactions.map((transaction, i) => (
        <div className="py-2" key={i}>
          <b>{usersMap[transaction.fromUserId]}</b> должен{" "}
          <b>{usersMap[transaction.toUserId]}</b>{" "}
          <Money
            className="float-right text-blue-700"
            amount={transaction.amount}
          />
        </div>
      ))}
    </div>
  );
}

export default Transactions;
