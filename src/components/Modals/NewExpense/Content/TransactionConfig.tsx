import Input from "../../../UI/Input";
import { IUser } from "../../../../stores/users.store";
import Select from "../../../UI/Select";

interface Props {
  users: IUser[];
  amount: number;
  setAmount: (amount: number) => void;
  toUser: IUser;
  setToUser: (amount: IUser) => void;
}

function TransactionConfig({ amount, setAmount, toUser, setToUser, users }: Props) {
  return (
    <>
      <Input
        className="my-2"
        placeholder="Введите деньги"
        value={amount}
        type="number"
        onChange={(e: any) => setAmount(parseFloat(e.currentTarget.value))}
      />
      <Select
        value={toUser}
        onChange={setToUser}
        items={users}
        placeholder="Выберите участника"
        bindValue="id"
        bindLabel="name"
      />
    </>
  );
}

export default TransactionConfig;
