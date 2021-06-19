import React, { useCallback } from "react";
import { observer } from "mobx-react";
import Input from "../../../UI/Input";
import UsersSettingsList from "./UserSettingsList";
import { IExpenseSettings } from "../../../../stores/expenses-settings.store";

interface Props {
  amount: number;
  setAmount: (v: number) => void;
  settings: Record<string, IExpenseSettings>;
  setSettings: (v: Record<string, IExpenseSettings>) => void;
}

function Content({ amount, setAmount, settings, setSettings }: Props) {
  return (
    <>
      <Input
        className="my-2"
        placeholder="Введите деньги"
        value={amount}
        type="number"
        onChange={useCallback(
          (e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.currentTarget.value)),
          [setAmount]
        )}
      />

      <UsersSettingsList expensesSettings={settings} setExpensesSettings={setSettings} />
    </>
  );
}

export default observer(Content);
