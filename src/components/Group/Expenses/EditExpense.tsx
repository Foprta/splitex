import { Dialog } from "@headlessui/react";
import firebase from "../../../config/firebase.config";
import Input from "../../UI/Input";
import { useState } from "react";
import { IExpense } from "../../../lib/splitex";
import Button from "../../UI/Button";

interface Props {
  groupId: string;
  userName: string;
  expense: IExpense;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function EditExpense({ groupId, expense, isOpen, setIsOpen, userName }: Props) {
  const [amount, setAmount] = useState(expense.amount);

  const editExpense = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("expenses")
      .doc(expense.id)
      .update({ amount })
      .then(() => setIsOpen(false))
      .catch(console.error);
  };

  const deleteExpense = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("expenses")
      .doc(expense.id)
      .delete()
      .catch(console.error);
  };

  return (
    <Dialog
      className="fixed z-10 inset-0 overflow-y-auto flex items-center mx-4"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="inline-block w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <Dialog.Title>
          Трата <b>{userName}</b>
        </Dialog.Title>

        <Input
          className="my-2"
          placeholder="Введите деньги"
          value={amount}
          type="number"
          onChange={(e: any) => setAmount(parseFloat(e.currentTarget.value))}
        />

        <div className="float-right">
          <Button className="mr-2" onClick={() => setIsOpen(false)}>
            Отмена
          </Button>
          <Button
            className="mr-2 bg-red-400 text-white"
            onClick={deleteExpense}
          >
            Удалить
          </Button>
          <Button className="bg-green-400" onClick={editExpense}>
            Сохранить
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default EditExpense;
