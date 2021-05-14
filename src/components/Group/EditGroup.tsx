import { Dialog } from "@headlessui/react";
import firebase from "../../config/firebase.config";
import Input from "../UI/Input";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../UI/Button";

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
      className="fixed z-10 inset-0 overflow-y-auto flex items-center mx-4"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

      <div className="inline-block w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
          <Button className="mr-2 bg-red-400 text-white" onClick={deleteGroup}>
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
