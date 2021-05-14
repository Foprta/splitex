import { Dialog } from "@headlessui/react";
import firebase from "../../../config/firebase.config";
import Input from "../../UI/Input";
import { useState } from "react";
import Button from "../../UI/Button";

function AddExpense({ groupId, user, isOpen, setIsOpen }: any) {
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const addExpense = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("expenses")
      .add({ amount, userId: user.id, userName: user.name })
      .then(() => setIsOpen(false))
      .catch(console.error);
  };

  return (
    <Dialog
      className="fixed z-10 inset-0 overflow-y-auto flex items-center mx-4"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="inline-block w-full max-w-md p-4  overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <Dialog.Title>
          Добавить трату для <b>{user.name}</b>
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
          <Button className="bg-green-400" onClick={addExpense}>
            Добавить
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default AddExpense;
