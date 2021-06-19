import Button from "../../UI/Button";
import expensesStore, { IExpense } from "../../../stores/expenses.store";
import React, { useCallback, useState } from "react";
import UserName from "../../UI/UserName";
import Modal from "../../UI/Modal";
import expensesSettingsStore, { IExpenseSettings } from "../../../stores/expenses-settings.store";
import groupsStore from "../../../stores/groups.store";
import usersStore from "../../../stores/users.store";
import Content from "./Content/Content";

interface Props {
  expense: IExpense;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function EditExpense({ expense, isOpen, setIsOpen }: Props) {
  const [amount, setAmount] = useState(expense.amount);

  const mappedExpenseSettings = {};
  expensesSettingsStore.expensesSettingsMap[expense.id]?.forEach(
    ({ userId, proportion, personal }) => (mappedExpenseSettings[userId] = { proportion, personal })
  );

  const [expensesSettings, setExpensesSettings] = useState<Record<string, IExpenseSettings>>(mappedExpenseSettings);

  const groupId = groupsStore.group.id;

  const closeModal = useCallback(() => setIsOpen(false), [setIsOpen]);

  const deleteExpense = useCallback(() => expensesStore.deleteExpense(groupId, expense.id).catch(console.error), [
    expense.id,
    groupId,
  ]);

  const editExpense = useCallback(() => {
    expensesSettingsStore.editExpenseSettings(expensesSettings, expense.id);
    expensesStore.editExpense(groupId, expense.id, amount).then(closeModal).catch(console.error);
  }, [amount, closeModal, expense.id, expensesSettings, groupId]);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      {{
        title: (
          <>
            Трата <UserName userName={usersStore.usersMap[expense.userId]} />
          </>
        ),
        content: (
          <Content
            amount={amount}
            setAmount={setAmount}
            settings={expensesSettings}
            setSettings={setExpensesSettings}
          />
        ),
        actions: (
          <>
            <Button className="mr-2" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
            <Button className="mr-2 text-white bg-red-400" onClick={deleteExpense}>
              Удалить
            </Button>
            <Button className="bg-green-400" onClick={editExpense}>
              Сохранить
            </Button>
          </>
        ),
      }}
    </Modal>
  );
}

export default EditExpense;
