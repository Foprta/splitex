import React, { useCallback } from "react";
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
      <div className="flex items-center my-2">
        <div>Сумма покупки:</div>
        <Input
          placeholder="Введите деньги"
          value={amount}
          className="flex-grow ml-2"
          type="number"
          onChange={useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => setAmount(parseFloat(e.currentTarget.value)),
            []
          )}
        />
      </div>

      <UsersSettingsList settings={settings} setSettings={setSettings} />
    </>
  );
}

export default Content;
