import { ComponentProps, useState } from "react";
import firebase from "../../../config/firebase.config";
import { UserAddIcon } from "@heroicons/react/outline";
import IconButton from "../../UI/IconButton";
import Input from "../../UI/Input";

function AddUser({ groupId }: ComponentProps<any>) {
  const [name, setName] = useState<string>("");

  const addUser = () =>
    firebase
      .firestore()
      .collection("groups")
      .doc(groupId)
      .collection("users")
      .add({ name, proportion: 1 })
      .then(() => setName(""))
      .catch(console.error);

  return (
    <div className="flex justify-center my-4">
      <Input
        placeholder="Добавьте нового участника"
        value={name}
        onChange={(e: any) => setName(e.currentTarget.value)}
      />
      <IconButton className="ml-2 text-green-500" onClick={addUser}>
        <UserAddIcon className="w-6 h-6" />
      </IconButton>
    </div>
  );
}

export default AddUser;
