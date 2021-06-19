import Transaction from "../Transactions/Transaction";
import manualTransactionsStore from "../../stores/manual-transactions.store";
import usersStore from "../../stores/users.store";
import groupsStore from "../../stores/groups.store";

function ExpensesList() {
  return (
    <>
      {manualTransactionsStore.manualTransactions.map((transaction) => (
        <Transaction
          key={transaction.id}
          fromUser={usersStore.usersMap[transaction.fromUserId]}
          toUser={usersStore.usersMap[transaction.toUserId]}
          amount={transaction.amount}
          manual={true}
          groupId={groupsStore.group.id}
          transaction={transaction}
          users={usersStore.users}
        />
      ))}
    </>
  );
}

export default ExpensesList;
