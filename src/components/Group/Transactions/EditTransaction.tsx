import { Dialog } from "@headlessui/react";
import firebase from "../../../config/firebase.config";
import Input from "../../UI/Input";
import { useState } from "react";
import { IManualTransaction, IUser } from "../../../lib/splitex";
import Button from "../../UI/Button";

interface Props {
  groupId: string;
  userName: string;
  transaction: IManualTransaction;
  users: IUser[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function EditTransaction({
  groupId,
  transaction,
  isOpen,
  setIsOpen,
  userName,
  users,
}: Props) {
  const [amount, setAmount] = useState(transaction.amount);
  const [toUserId, setToUserId] = useState<string | undefined>(
    transaction.toUserId
  );

  const editTransaction = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("transactions")
      .doc(transaction.id)
      .update({ amount, toUserId })
      .then(() => setIsOpen(false))
      .catch(console.error);
  };

  const deleteTransaction = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("transactions")
      .doc(transaction.id)
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

        <div>
          <Input
            className="my-2"
            placeholder="Введите деньги"
            value={amount}
            type="number"
            onChange={(e: any) => setAmount(parseFloat(e.currentTarget.value))}
          />

          <select
            placeholder="Кому перевод"
            onChange={(e) => setToUserId(e.target.value)}
          >
            {users.map(({ name, id }) => (
              <option selected={id === toUserId} key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="float-right">
          <Button className="mr-2" onClick={() => setIsOpen(false)}>
            Отмена
          </Button>
          <Button
            className="mr-2 bg-red-400 text-white"
            onClick={deleteTransaction}
          >
            Удалить
          </Button>
          <Button className="bg-green-400" onClick={editTransaction}>
            Сохранить
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default EditTransaction;
