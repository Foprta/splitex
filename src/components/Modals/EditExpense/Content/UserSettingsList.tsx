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
    <>
      {usersStore.users.map((user) => (
        <UserSettings
          key={user.id}
          user={user}
          settings={settings[user.id]}
          setSettings={(v) => setSettings({ ...settings, [user.id]: v })}
        />
      ))}
    </>
  );
}

export default observer(UsersSettingsList);
