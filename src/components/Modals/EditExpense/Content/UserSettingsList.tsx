import React from "react";
import usersStore from "../../../../stores/users.store";
import { observer } from "mobx-react";
import UserSettings from "./UserSettings";
import { IExpenseSettings } from "../../../../stores/expenses-settings.store";

interface Props {
  expensesSettings: Record<string, IExpenseSettings>;
  setExpensesSettings: (v: Record<string, IExpenseSettings>) => void;
}

function UsersSettingsList({ expensesSettings, setExpensesSettings }: Props) {
  return (
    <>
      {usersStore.users.map((user) => (
        <UserSettings
          key={user.id}
          user={user}
          expensesSettings={expensesSettings}
          setExpensesSettings={setExpensesSettings}
        />
      ))}
    </>
  );
}

export default observer(UsersSettingsList);
