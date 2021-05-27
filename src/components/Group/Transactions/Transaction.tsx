import Money from "../../UI/Money";
import { useState } from "react";
import EditTransaction from "./EditTransaction";
import IconButton from "../../UI/IconButton";
import { PencilAltIcon } from "@heroicons/react/outline";
import { IManualTransaction } from "../../../stores/manual-transactions.store";
import { IUser } from "../../../stores/users.store";

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
      <span>
        <b>{fromUser}</b> {manual ? "→" : "должен"} <b>{toUser}</b>{" "}
      </span>

      <div className="flex justify-between items-center">
        {groupId && transaction && users && (
          <IconButton onClick={() => setIsOpen(true)} className="mr-2 text-yellow-500">
            <PencilAltIcon className="w-6 h-6" />
          </IconButton>
        )}

        <Money className="float-right text-blue-700" amount={amount} />
      </div>
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
