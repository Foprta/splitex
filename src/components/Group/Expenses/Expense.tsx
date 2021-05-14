import { IExpense } from "../../../lib/splitex";
import Money from "../../UI/Money";
import IconButton from "../../UI/IconButton";
import { PencilAltIcon } from "@heroicons/react/outline";
import { useState } from "react";
import EditExpense from "./EditExpense";

interface Props {
  groupId: string;
  expense: IExpense;
  userName: string;
}

function Expenses({ groupId, expense, userName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center py-1.5">
      <span>
        <b>{userName}</b> потратил
      </span>
      <div className="flex justify-between items-center">
        <IconButton
          onClick={() => setIsOpen(true)}
          className="mr-2 text-yellow-500"
        >
          <PencilAltIcon className="w-6 h-6" />
        </IconButton>
        <Money amount={expense.amount} />
      </div>

      {isOpen && (
        <EditExpense
          groupId={groupId}
          expense={expense}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          userName={userName}
        />
      )}
    </div>
  );
}

export default Expenses;
