import { Dialog } from "@headlessui/react";
import firebase from "../../../config/firebase.config";
import Input from "../../UI/Input";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../UI/Button";

interface Props {
  group: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function EditUser({ group, isOpen, setIsOpen }: Props) {
  const [name, setName] = useState(group.name);
  const history = useHistory();

  const editGroup = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .update({ name })
      .then(() => setIsOpen(false))
      .catch(console.error);
  };

  const deleteGroup = () => {
    firebase
      .firestore()
      .collection("groups")
      .doc(group.id)
      .delete()
      .then(() => history.push("/"))
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
          Группа <b>{group.name}</b>
        </Dialog.Title>

        <Input
          className="my-2"
          placeholder="Имя группы"
          value={name}
          onChange={(e: any) => setName(e.currentTarget.value)}
        />

        <div className="float-right">
          <Button className="mr-2" onClick={() => setIsOpen(false)}>
            Отмена
          </Button>
          <Button className="mr-2 text-white bg-red-400" onClick={deleteGroup}>
            Удалить
          </Button>
          <Button className="bg-green-400" onClick={editGroup}>
            Сохранить
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default EditUser;
