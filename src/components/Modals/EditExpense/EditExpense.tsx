import Button from "../../UI/Button";
import { IExpense } from "../../../stores/expenses.store";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import UserName from "../../UI/UserName";
import Modal from "../../UI/Modal";
import expensesSettingsStore from "../../../stores/expenses-settings.store";
import usersStore from "../../../stores/users.store";
import Content from "./Content/Content";
import { observer } from "mobx-react";

interface Props {
  expense: IExpense;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function EditExpense({ expense, isOpen, setIsOpen }: Props) {
  const [amount, setAmount] = useState(expense.amount);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    if (expensesSettingsStore.expensesSettings === undefined) return;
    const result = {};
    expensesSettingsStore.expensesSettingsMap[expense.id]?.forEach((e) => (result[e.userId] = e));
    setSettings(result);
  }, [expensesSettingsStore.expensesSettings]);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const deleteExpense = useCallback(() => expense.ref.delete().catch(console.error), []);

  const editExpense = useCallback(() => {
    const batch = expensesSettingsStore.editExpenseSettings(settings, expense.id);
    batch.update(expense.ref, { amount }).commit().then(closeModal).catch(console.error);
  }, [settings, amount]);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      {{
        title: (
          <>
            <UserName userName={useMemo(() => usersStore.usersMap[expense.userId], [])} /> потратил
          </>
        ),
        content: <Content amount={amount} setAmount={setAmount} settings={settings} setSettings={setSettings} />,
        actions: (
          <>
            <Button className="mr-2" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button className="mr-2 text-white bg-red-600" onClick={deleteExpense}>
              Удалить
            </Button>
            <Button className="text-white bg-green-600" onClick={editExpense}>
              Сохранить
            </Button>
          </>
        ),
      }}
    </Modal>
  );
}

export default observer(EditExpense);
