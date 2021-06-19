import React, { useCallback, useState } from "react";
import { IUser } from "../../../stores/users.store";
import UserName from "../../UI/UserName";
import Modal from "../../UI/Modal";
import Content from "./Content/Content";
import { ExpenseType } from "../../../models/enums";
import Button from "../../UI/Button";
import expensesStore from "../../../stores/expenses.store";
import groupsStore from "../../../stores/groups.store";
import manualTransactionsStore from "../../../stores/manual-transactions.store";

interface Props {
  user: IUser;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function AddExpense({ isOpen, setIsOpen, user }: Props) {
  const [type, setType] = useState<ExpenseType>(ExpenseType.EXPENSE);
  const [amount, setAmount] = useState(0);
  const [toUser, setToUser] = useState<IUser | undefined>();

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setAmount(0);
    setToUser(undefined);
    setType(ExpenseType.EXPENSE);
  }, [setIsOpen]);

  const addNewExpense = useCallback(() => {
    switch (type) {
      case ExpenseType.EXPENSE:
        expensesStore.addExpense(groupsStore.group.id, amount, user.id).then(closeModal).catch(console.error);
        break;
      case ExpenseType.MANUAL_TRANSACTION:
        manualTransactionsStore
          .addManualTransaction(groupsStore.group.id, amount, user.id, toUser.id)
          .then(closeModal)
          .catch(console.error);
    }
  }, [amount, closeModal, toUser?.id, type, user.id]);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      {{
        title: (
          <>
            Добавить трату для <UserName userName={user.name} />
          </>
        ),
        content: (
          <Content
            type={type}
            setType={setType}
            amount={amount}
            setAmount={setAmount}
            toUser={toUser}
            setToUser={setToUser}
            user={user}
          />
        ),
        actions: (
          <>
            <Button className="mr-2" onClick={closeModal}>
              Отмена
            </Button>
            <Button className="bg-green-300" onClick={addNewExpense}>
              Сохранить
            </Button>
          </>
        ),
      }}
    </Modal>
  );
}

export default AddExpense;
