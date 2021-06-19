import React from "react";
import { observer } from "mobx-react";
import Input from "../../../UI/Input";
import { IUser } from "../../../../stores/users.store";
import { IExpenseSettings } from "../../../../stores/expenses-settings.store";

interface Props {
  user: IUser;
  expensesSettings: Record<string, IExpenseSettings>;
  setExpensesSettings: (settings: Record<string, IExpenseSettings>) => void;
}

function UsersSettings({ user, expensesSettings, setExpensesSettings }: Props) {
  return (
    <div className="flex">
      <span>{user.name}</span>
      <Input
        type="number"
        placeholder="Пропорция"
        value={expensesSettings[user.id]?.proportion ?? 1}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setExpensesSettings({
            ...expensesSettings,
            [user.id]: { ...expensesSettings[user.id], proportion: parseInt(e.currentTarget.value) },
          })
        }
      />
      <Input
        type="number"
        placeholder="Сумма"
        value={expensesSettings[user.id]?.personal ?? 0}
        onChange={(e: any) =>
          setExpensesSettings({
            ...expensesSettings,
            [user.id]: { ...expensesSettings[user.id], personal: parseInt(e.currentTarget.value) },
          })
        }
      />
    </div>
  );
}

export default observer(UsersSettings);
