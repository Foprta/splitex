import Money from "../UI/Money";
import { useState } from "react";
import EditUser from "./EditUser";
import { IUser } from "../../stores/users.store";
import { IExpense } from "../../stores/expenses.store";
import UserName from "../UI/UserName";
import NewExpense from "../Modals/NewExpense/NewExpense";

interface Props {
  user: IUser;
  groupId: string;
  expenses: IExpense[];
  users: IUser[];
}

function User({ user, groupId, expenses, users }: Props) {
  const [newExpenseOpened, setNewExpenseOpened] = useState(false);
  const [editUserOpened, setEditUserOpened] = useState(false);

  const totalExpenses = expenses.reduce((acc, { amount }) => acc + amount, 0);

  return (
    <div className="flex justify-between items-center py-1.5">
      <button className="clickable" onClick={() => setEditUserOpened(true)}>
        <UserName userName={user.name || "username"} />
      </button>

      <button className="clickable" onClick={() => setNewExpenseOpened(true)}>
        <Money amount={totalExpenses} />
      </button>

      <NewExpense user={user} isOpen={newExpenseOpened} setIsOpen={setNewExpenseOpened} />
      <EditUser groupId={groupId} user={user} isOpen={editUserOpened} setIsOpen={setEditUserOpened} />
    </div>
  );
}

export default User;
