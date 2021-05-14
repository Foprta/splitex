import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import firebase from "../config/firebase.config";
import Input from "./UI/Input";
import IconButton from "./UI/IconButton";
import { UserGroupIcon } from "@heroicons/react/solid";

function useGroups(): any {
  const [groups, setGroups] = useState<any>([]);

  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("groups")
      .onSnapshot((snapshot) => {
        const newGroups = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGroups(newGroups);
      });

    return () => unsub();
  }, []);

  return groups;
}

function Landing() {
  const [name, setName] = useState("");
  const groups = useGroups();

  const addGroup = () =>
    firebase
      .firestore()
      .collection("groups")
      .add({ name })
      .then(() => setName(""))
      .catch(console.error);

  return (
    <div className="flex flex-col w-full">
      <div className="divide-y-1 divide-black mb-4">
        {groups.map(({ id, name }: any) => (
          <Link className="block py-1.5" key={id} to={id}>
            {name}
          </Link>
        ))}
      </div>

      <div className="flex">
        <Input
          placeholder="Добавьте группу"
          value={name}
          min={3}
          onChange={(e: any) => setName(e.currentTarget.value)}
        />
        <IconButton className="ml-2 text-green-500" onClick={addGroup}>
          <UserGroupIcon className="w-6 h-6" />
        </IconButton>
      </div>
    </div>
  );
}

export default Landing;
