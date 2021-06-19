import Money from "../UI/Money";
import { useCallback, useState } from "react";
import EditExpense from "../Modals/EditExpense/EditExpense";
import { IExpense } from "../../stores/expenses.store";
import UserName from "../UI/UserName";
import usersStore from "../../stores/users.store";

interface Props {
  expense: IExpense;
}

function Expense({ expense }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <div className="flex justify-between items-center py-1.5">
      <UserName userName={usersStore.usersMap[expense.userId]} />
      <button className="text-red-600 clickable" onClick={useCallback(() => setIsEditOpen(true), [])}>
        <Money amount={expense.amount} />
      </button>
      <EditExpense expense={expense} isOpen={isEditOpen} setIsOpen={setIsEditOpen} />
    </div>
  );
}

export default Expense;
