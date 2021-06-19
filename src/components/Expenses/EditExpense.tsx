import { Dialog } from "@headlessui/react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { IExpense } from "../../stores/expenses.store";
import React, { useState } from "react";
import { IUser } from "../../stores/users.store";
import UserName from "../UI/UserName";

interface Props {
  userName: string;
  expense: IExpense;
  users: IUser[];
  mappedExpenseSettings: any;
  setIsOpen: (isOpen: boolean) => void;
  onRemove: () => void;
  onEdit: (amount: number, expensesSettings: any) => void;
}

function EditExpense({ userName, expense, setIsOpen, onEdit, onRemove, users, mappedExpenseSettings }: Props) {
  const [amount, setAmount] = useState(expense.amount);
  const [expensesSettings, setExpensesSettings] = useState(mappedExpenseSettings);

  return (
    <Dialog
      className="flex overflow-y-auto fixed inset-0 z-10 items-center mx-4"
      open={true}
      onClose={() => setIsOpen(false)}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="inline-block overflow-hidden p-4 w-full max-w-md text-left align-middle bg-white rounded-2xl shadow-xl transition-all transform">
        <Dialog.Title>
          Трата <UserName userName={userName} />
        </Dialog.Title>

        <Input
          className="my-2"
          placeholder="Введите деньги"
          value={amount}
          type="number"
          onChange={(e: any) => setAmount(parseFloat(e.currentTarget.value))}
        />

        {users.map((user) => {
          return (
            <div className="flex">
              <span>{user.name}</span>
              <Input
                type="number"
                placeholder="Пропорция"
                value={expensesSettings[user.id]?.proportion ?? 1}
                onChange={(e: any) =>
                  setExpensesSettings({
                    ...expensesSettings,
                    [user.id]: { proportion: parseInt(e.currentTarget.value) },
                  })
                }
              />
              <Input
                type="number"
                placeholder="Сумма"
                value={expensesSettings[user.id]?.personal ?? 0}
                onChange={(e: any) =>
                  setExpensesSettings({ ...expensesSettings, [user.id]: { personal: parseInt(e.currentTarget.value) } })
                }
              />
            </div>
          );
        })}

        <div className="float-right">
          <Button className="mr-2" onClick={() => setIsOpen(false)}>
            Отмена
          </Button>
          <Button className="mr-2 text-white bg-red-400" onClick={onRemove}>
            Удалить
          </Button>
          <Button className="bg-green-400" onClick={() => onEdit(amount, expensesSettings)}>
            Сохранить
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default EditExpense;
