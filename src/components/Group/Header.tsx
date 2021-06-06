import Money from "../UI/Money";
import React, { useState } from "react";
import EditGroup from "./EditGroup";
import { IExpense } from "../../stores/expenses.store";
import GroupName from "../UI/GroupName";

interface Props {
  group: any;
  expenses: IExpense[];
}

function Header({ group, expenses }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const sumOfExpenses = expenses.reduce((acc, { amount }) => acc + amount, 0);

  return (
    <div className="flex justify-between items-center mb-1.5">
      <div className="flex items-center">
        <span>
          {group?.name ? (
            <button className="clickable" onClick={() => setIsOpen(true)}>
              <GroupName groupName={group.name} />
            </button>
          ) : (
            "загрузка..."
          )}
        </span>
      </div>
      <Money className="font-bold" amount={sumOfExpenses} />

      {group && isOpen && <EditGroup group={group} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Header;
