import { Dialog } from "@headlessui/react";
import firebase from "../../config/firebase.config";
import Input from "../UI/Input";
import { useState } from "react";
import Button from "../UI/Button";
import { IUser } from "../../stores/users.store";

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
      .then(() => firebase.firestore().collection("groups").doc(groupId).collection("users").doc(user.id).delete())
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

        <div className="mb-2 text-red-500">При удалении участника удалятся все его траты</div>

        <div className="float-right">
          <Button className="mr-2" onClick={() => setIsOpen(false)}>
            Отмена
          </Button>
          <Button className="mr-2 text-white bg-red-400" onClick={deleteUser}>
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
