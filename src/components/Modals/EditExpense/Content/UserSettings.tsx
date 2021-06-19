import React, { useCallback } from "react";
import { observer } from "mobx-react";
import Input from "../../../UI/Input";
import { IUser } from "../../../../stores/users.store";
import { IExpenseSettings } from "../../../../stores/expenses-settings.store";

interface Props {
  user: IUser;
  settings: IExpenseSettings;
  setSettings: (v: IExpenseSettings) => void;
}

function UsersSettings({ user, settings, setSettings }: Props) {
  return (
    <div className="flex">
      <span>{user.name}</span>
      <Input
        type="number"
        placeholder="Пропорция"
        value={settings?.proportion ?? 1}
        onChange={useCallback(
          (e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings({ ...settings, userId: user.id, proportion: parseInt(e.currentTarget.value) }),
          []
        )}
      />
      <Input
        type="number"
        placeholder="Сумма"
        value={settings?.personal ?? 0}
        onChange={useCallback(
          (e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings({ ...settings, userId: user.id, personal: parseInt(e.currentTarget.value) }),
          []
        )}
      />
    </div>
  );
}

export default observer(UsersSettings);
