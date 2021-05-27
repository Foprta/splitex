import Money from "../UI/Money";
import IconButton from "../UI/IconButton";
import { PencilAltIcon } from "@heroicons/react/outline";
import { useState } from "react";
import EditGroup from "./EditGroup";
import { IExpense } from "../../stores/expenses.store";

interface Props {
  group: any;
  expenses: IExpense[];
}

function Header({ group, expenses }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const sumOfExpenses = expenses.reduce((acc, { amount }) => acc + amount, 0);

  return (
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center">
        <span className="font-bold">{group?.name || "загрузка..."}</span>
        <IconButton onClick={() => setIsOpen(true)} className="ml-2 text-yellow-500">
          <PencilAltIcon className="w-6 h-6" />
        </IconButton>
      </div>
      <Money className="font-bold" amount={sumOfExpenses} />

      {group && isOpen && <EditGroup group={group} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Header;
