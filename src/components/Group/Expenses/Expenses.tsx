import { IExpense, IUser } from "../../../lib/splitex";
import { createUsersMap } from "../../../utils/utils";
import Expense from "./Expense";

interface Props {
  groupId: string;
  users: IUser[];
  expenses: IExpense[];
}

function Expenses({ groupId, users, expenses }: Props) {
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
    </div>
  );
}

export default Expenses;
