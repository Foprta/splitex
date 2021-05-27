import { Dialog } from "@headlessui/react";
import firebase from "../../../config/firebase.config";
import Input from "../../UI/Input";
import { useState } from "react";
import Button from "../../UI/Button";
import { IUser } from "../../../stores/users.store";

interface Props {
  users: IUser[];
  groupId: string;
  user: IUser;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function AddTransaction({ groupId, user, isOpen, setIsOpen, users }: Props) {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [toUserId, setToUserId] = useState<string | undefined>();

  const addTransaction = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("manualTransactions")
      .add({ amount, fromUserId: user.id, toUserId })
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
          Добавить перевод для <b>{user.name}</b>
        </Dialog.Title>

        <div>
          <Input
            className="my-2"
            placeholder="Введите деньги"
            value={amount}
            type="number"
            onChange={(e: any) => setAmount(parseFloat(e.currentTarget.value))}
          />

          <select placeholder="Кому перевод" onChange={(e) => setToUserId(e.target.value)}>
            {users.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="float-right">
          <Button className="mr-2" onClick={() => setIsOpen(false)}>
            Отмена
          </Button>
          <Button className="bg-green-400" onClick={addTransaction}>
            Добавить
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default AddTransaction;
