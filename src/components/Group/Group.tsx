import React, { useEffect } from "react";
import Header from "./Header";
import Transactions from "../Transactions/Transactions";
import Users from "../Users/Users";
import Expenses from "../Expenses/Expenses";
import { RouteComponentProps } from "react-router-dom";
import groupsStore from "../../stores/groups.store";
import usersStore from "../../stores/users.store";
import expensesStore from "../../stores/expenses.store";
import manualTransactionsStore from "../../stores/manual-transactions.store";
import expensesSettingsStore from "../../stores/expenses-settings.store";
import { observer } from "mobx-react";

interface Props {
  id: string;
}

function Group({ match }: RouteComponentProps<Props>) {
  const groupId = match.params.id;

  useEffect(() => {
    groupsStore.groupSub(groupId);
    usersStore.usersSub(groupId);
    expensesStore.expensesListener(groupId);
    manualTransactionsStore.manualTransactionsSub(groupId);
    expensesSettingsStore.expensesSettingsSub(groupId);

    return () => {
      groupsStore.resetGroup();
      usersStore.resetUsers();
      expensesStore.resetExpenses();
      manualTransactionsStore.resetManualTransactions();
      expensesSettingsStore.resetExpensesSettings();
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Header group={groupsStore.group} expenses={expensesStore.expenses} />
      <Users groupId={groupsStore.group?.id} users={usersStore.users} expenses={expensesStore.expenses} />

      <div className="block-header">Необходимые переводы</div>
      <Transactions
        users={usersStore.users}
        expenses={expensesStore.expenses}
        manualTransactions={manualTransactionsStore.manualTransactions}
        expensesSettings={expensesSettingsStore.expensesSettings}
      />

      <div className="block-header">Траты участников</div>
      <Expenses />
    </div>
  );
}

export default observer(Group);
