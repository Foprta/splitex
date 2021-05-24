import { Dialog } from "@headlessui/react";
import firebase from "../../../config/firebase.config";
import Input from "../../UI/Input";
import { useState } from "react";
import { IUser } from "../../../lib/splitex";
import Button from "../../UI/Button";

interface Props {
  groupId: string;
  user: IUser;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function EditUser({ groupId, user, isOpen, setIsOpen }: Props) {
  const [name, setName] = useState(user.name);
  const [proportion, setProportion] = useState(user.proportion);

  const editUser = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("users")
      .doc(user.id)
      .update({ name, proportion })
      .then(() => setIsOpen(false))
      .catch(console.error);
  };

  const deleteUser = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("expenses")
      .where("userId", "==", user.id)
      .get()
      .then((snapshot) => {
        const batch = firebase.firestore().batch();
        snapshot.docs.forEach((doc) => batch.delete(doc.ref));
        return batch.commit();
      })
      .then(() =>
        firebase
          .firestore()
          .collection("groups")
          .doc(groupId)
          .collection("users")
          .doc(user.id)
          .delete()
      )
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
          Участник <b>{user.name}</b>
        </Dialog.Title>

        <Input
          className="my-2"
          placeholder="Имя участника"
          value={name}
          onChange={(e: any) => setName(e.currentTarget.value)}
        />

        <Input
          className="my-2"
          placeholder="Пропорция"
          value={proportion}
          type="number"
          onChange={(e: any) => setProportion(parseInt(e.currentTarget.value))}
        />

        <div className="text-red-500 mb-2">
          При удалении участника удалятся все его траты
        </div>

        <div className="float-right">
          <Button className="mr-2" onClick={() => setIsOpen(false)}>
            Отмена
          </Button>
          <Button className="mr-2 bg-red-400 text-white" onClick={deleteUser}>
            Удалить
          </Button>
          <Button className="bg-green-400" onClick={editUser}>
            Сохранить
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default EditUser;
