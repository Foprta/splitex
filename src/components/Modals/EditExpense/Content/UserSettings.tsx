import React, { useCallback } from "react";
import { observer } from "mobx-react";
import Input from "../../../UI/Input";
import { IUser } from "../../../../stores/users.store";
import { IExpenseSettings } from "../../../../stores/expenses-settings.store";
import UserName from "../../../UI/UserName";

interface Props {
  user: IUser;
  settings: IExpenseSettings;
  setSettings: (v: IExpenseSettings) => void;
}

function UserSettings({ user, settings, setSettings }: Props) {
  return (
    <tr>
      <td>
        <UserName className="mr-2" userName={user.name} />
      </td>
      <td>
        <Input
          type="number"
          placeholder="Пропорция"
          className="w-full "
          value={settings?.proportion ?? 1}
          onChange={useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) =>
              setSettings({ ...settings, userId: user.id, proportion: parseInt(e.currentTarget.value) }),
            []
          )}
        />
      </td>
      <td>
        <Input
          type="number"
          placeholder="Сумма"
          className="w-full"
          value={settings?.personal ?? 0}
          onChange={useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) =>
              setSettings({ ...settings, userId: user.id, personal: parseInt(e.currentTarget.value) }),
            []
          )}
        />
      </td>
    </tr>
  );
}

export default observer(UserSettings);
