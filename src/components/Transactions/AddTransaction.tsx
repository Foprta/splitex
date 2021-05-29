import Input from "../UI/Input";
import { IUser } from "../../stores/users.store";
import { Listbox } from "@headlessui/react";

interface Props {
  users: IUser[];
  amount: number;
  setAmount: (amount: number) => void;
  toUser: IUser;
  setToUser: (amount: IUser) => void;
}

function AddTransaction({ amount, setAmount, toUser, setToUser, users }: Props) {
  return (
    <>
      <Input
        className="my-2"
        placeholder="Введите деньги"
        value={amount}
        type="number"
        onChange={(e: any) => setAmount(parseFloat(e.currentTarget.value))}
      />
      <Listbox value={toUser} onChange={setToUser}>
        <Listbox.Button>{toUser.name || "Выберите участника"}</Listbox.Button>
        <Listbox.Options>
          {users.map((person) => (
            <Listbox.Option key={person.id} value={person}>
              {person.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </>
  );
}

export default AddTransaction;
