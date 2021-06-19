import { Dialog } from "@headlessui/react";
import firebase from "../../../config/firebase.config";
import Input from "../../UI/Input";
import { useState } from "react";
import Button from "../../UI/Button";
import { IManualTransaction } from "../../../stores/manual-transactions.store";
import { IUser } from "../../../stores/users.store";
import UserName from "../../UI/UserName";

interface Props {
  groupId: string;
  userName: string;
  transaction: IManualTransaction;
  users: IUser[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function EditTransaction({ groupId, transaction, isOpen, setIsOpen, userName, users }: Props) {
  const [amount, setAmount] = useState(transaction.amount);
  const [toUserId, setToUserId] = useState<string | undefined>(transaction.toUserId);

  const editTransaction = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("manualTransactions")
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
      .collection("manualTransactions")
      .doc(transaction.id)
      .delete()
      .catch(console.error);
  };

  return (
    <Dialog
      className="flex overflow-y-auto fixed inset-0 z-10 items-center mx-4"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="inline-block overflow-hidden p-4 w-full max-w-md text-left align-middle bg-white rounded-2xl shadow-xl transition-all transform">
        <Dialog.Title>
          Трата <UserName userName={userName} />
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
          <Button className="mr-2 text-white bg-red-400" onClick={deleteTransaction}>
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
