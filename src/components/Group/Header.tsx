import Money from "../UI/Money";
import React, { useMemo, useState } from "react";
import EditGroup from "../Modals/EditGroup/EditGroup";
import GroupName from "../UI/GroupName";
import groupsStore from "../../stores/groups.store";
import expensesStore from "../../stores/expenses.store";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const group = groupsStore.group;
  const sumOfExpenses = useMemo(() => expensesStore.expenses.reduce((acc, { amount }) => acc + amount, 0), [
    expensesStore.expenses,
  ]);

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

      {group && <EditGroup isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Header;
