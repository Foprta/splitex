import Money from "../UI/Money";
import { useCallback, useState } from "react";
import EditUser from "../Modals/EditUser/EditUser";
import { IUser } from "../../stores/users.store";
import { IExpense } from "../../stores/expenses.store";
import UserName from "../UI/UserName";
import AddExpense from "../Modals/AddExpense/AddExpense";

interface Props {
  user: IUser;
  groupId: string;
  expenses: IExpense[];
  users: IUser[];
}

function User({ user, groupId, expenses, users }: Props) {
  const [addExpenseOpened, setAddExpenseOpened] = useState(false);
  const [editUserOpened, setEditUserOpened] = useState(false);

  const totalExpenses = expenses.reduce((acc, { amount }) => acc + amount, 0);

  return (
    <div className="flex justify-between items-center py-1.5">
      <button className="clickable" onClick={useCallback(() => setEditUserOpened(true), [])}>
        <UserName userName={user.name || "username"} />
      </button>

      <button className="clickable" onClick={useCallback(() => setAddExpenseOpened(true), [])}>
        <Money amount={totalExpenses} />
      </button>

      <AddExpense user={user} isOpen={addExpenseOpened} setIsOpen={setAddExpenseOpened} />
      <EditUser groupId={groupId} user={user} isOpen={editUserOpened} setIsOpen={setEditUserOpened} />
    </div>
  );
}

export default User;
