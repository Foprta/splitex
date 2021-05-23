import { IExpense, IUser } from "../../../lib/splitex";
import Money from "../../UI/Money";
import IconButton from "../../UI/IconButton";
import { CashIcon, PencilAltIcon } from "@heroicons/react/outline";
import { useState } from "react";
import AddExpense from "../Expenses/AddExpense";
import EditUser from "./EditUser";
import AddTransaction from "../Transactions/AddTransaction";

interface Props {
  user: IUser;
  groupId: string;
  expenses: IExpense[];
  users: IUser[];
}

function User({ user, groupId, expenses, users }: Props) {
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);

  const totalExpenses = expenses.reduce((acc, { amount }) => acc + amount, 0);

  return (
    <div className="flex justify-between items-center py-1.5">
      <div className="flex items-center">
        <span>{user.name}</span>
        <IconButton
          onClick={() => setIsEditUserOpen(true)}
          className="ml-2 text-yellow-500"
        >
          <PencilAltIcon className="w-6 h-6" />
        </IconButton>
      </div>

      <div className="flex items-center">
        <IconButton
          onClick={() => setIsAddTransactionOpen(true)}
          className="text-blue-500 mr-2"
        >
          <CashIcon className="w-6 h-6" />
        </IconButton>
        <IconButton
          onClick={() => setIsAddExpenseOpen(true)}
          className="text-red-500 mr-2"
        >
          <CashIcon className="w-6 h-6" />
        </IconButton>
        <Money amount={totalExpenses} />
      </div>

      {isAddTransactionOpen && (
        <AddTransaction
          users={users}
          groupId={groupId}
          user={user}
          isOpen={isAddTransactionOpen}
          setIsOpen={setIsAddTransactionOpen}
        />
      )}

      {isEditUserOpen && (
        <EditUser
          groupId={groupId}
          user={user}
          isOpen={isEditUserOpen}
          setIsOpen={setIsEditUserOpen}
        />
      )}

      {isAddExpenseOpen && (
        <AddExpense
          user={user}
          groupId={groupId}
          isOpen={isAddExpenseOpen}
          setIsOpen={setIsAddExpenseOpen}
        />
      )}
    </div>
  );
}

export default User;
