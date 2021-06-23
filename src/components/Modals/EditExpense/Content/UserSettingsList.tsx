import React from "react";
import usersStore from "../../../../stores/users.store";
import { observer } from "mobx-react";
import UserSettings from "./UserSettings";
import { IExpenseSettings } from "../../../../stores/expenses-settings.store";

interface Props {
  settings: Record<string, IExpenseSettings>;
  setSettings: (v: Record<string, IExpenseSettings>) => void;
}

function UsersSettingsList({ settings, setSettings }: Props) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th> </th>
          <th>Пропорция, коэф</th>
          <th>Личные траты, руб</th>
        </tr>
      </thead>
      <tbody>
        {usersStore.users.map((user) => (
          <UserSettings
            key={user.id}
            user={user}
            settings={settings[user.id]}
            setSettings={(v) => setSettings({ ...settings, [user.id]: v })}
          />
        ))}
      </tbody>
    </table>
  );
}

export default observer(UsersSettingsList);
