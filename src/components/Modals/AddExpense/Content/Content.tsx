import React, { useMemo } from "react";
import usersStore, { IUser } from "../../../../stores/users.store";
import { RadioGroup } from "@headlessui/react";
import ExpenseConfig from "./ExpenseConfig";
import TransactionConfig from "./TransactionConfig";
import classNames from "classnames";
import { observer } from "mobx-react";
import { ExpenseType } from "../../../../models/enums";

interface Props {
  type: ExpenseType;
  setType: (v: ExpenseType) => void;
  amount: number;
  setAmount: (v: number) => void;
  toUser: IUser;
  setToUser: (v: IUser) => void;
  user: IUser;
}

function Content({ type, setType, amount, setAmount, toUser, setToUser, user }: Props) {
  const options = [
    { value: ExpenseType.EXPENSE, title: "Покупка" },
    { value: ExpenseType.MANUAL_TRANSACTION, title: "Перевод" },
  ];

  const radioClass = ({ checked }) =>
    classNames("duration-75 p-1.5 flex-grow text-center", checked ? "bg-blue-200" : "bg-gray-100");

  const filteredUsers = useMemo(() => usersStore.users.filter(({ id }) => id !== user.id), [user.id]);

  return (
    <>
      <RadioGroup className="flex" value={type} onChange={setType}>
        {options.map(({ value, title }) => (
          <RadioGroup.Option key={value} className={radioClass} value={value}>
            {title}
          </RadioGroup.Option>
        ))}
      </RadioGroup>

      <div className="w-full">
        {type === ExpenseType.EXPENSE ? (
          <ExpenseConfig amount={amount} setAmount={setAmount} />
        ) : (
          <TransactionConfig
            users={filteredUsers}
            amount={amount}
            setAmount={setAmount}
            toUser={toUser}
            setToUser={setToUser}
          />
        )}
      </div>
    </>
  );
}

export default observer(Content);
