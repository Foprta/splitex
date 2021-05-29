import Money from "../UI/Money";
import { useState } from "react";
import EditTransaction from "./EditTransaction";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { IManualTransaction } from "../../stores/manual-transactions.store";
import { IUser } from "../../stores/users.store";
import UserName from "../UI/UserName";

interface Props {
  fromUser: string;
  toUser: string;
  amount: number;
  manual?: boolean;
  groupId?: string;
  transaction?: IManualTransaction;
  users?: IUser[];
}

function Transaction({ fromUser, toUser, amount, manual, transaction, groupId, users }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-between items-center py-1.5">
      <span className="flex items-center">
        <UserName userName={fromUser} />
        <ArrowNarrowRightIcon className={"mx-1.5 h-5 w-5 " + (manual ? "text-green-600" : "text-red-500")} />
        <UserName userName={toUser} />
      </span>

      {groupId && transaction && users ? (
        <button className="float-right text-green-700 clickable" onClick={() => setIsOpen(true)}>
          <Money amount={amount} />
        </button>
      ) : (
        <Money className="float-right text-red-700" amount={amount} />
      )}

      {isOpen && groupId && transaction && users && (
        <EditTransaction
          groupId={groupId}
          transaction={transaction}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          userName={fromUser}
          users={users}
        />
      )}
    </div>
  );
}

export default Transaction;
