import React from "react";
import { inject, observer } from "mobx-react";
import { GroupsStore } from "../../stores/groups.store";
import { UsersStore } from "../../stores/users.store";
import { ExpensesStore } from "../../stores/expenses.store";
import { ManualTransactionsStore } from "../../stores/manual-transactions.store";
import Header from "./Header";
import Transactions from "../Transactions/Transactions";
import Users from "../Users/Users";
import Expenses from "../Expenses/Expenses";
import { ExpensesSettingsStore } from "../../stores/expenses-settings.store";

interface Props {
  groupsStore?: GroupsStore;
  usersStore?: UsersStore;
  expensesStore?: ExpensesStore;
  manualTransactionsStore?: ManualTransactionsStore;
  expensesSettingsStore?: ExpensesSettingsStore;
  match: any;
}

@inject("groupsStore", "usersStore", "expensesStore", "manualTransactionsStore", "expensesSettingsStore")
@observer
class Group extends React.Component<Props> {
  componentDidMount() {
    const groupId = this.props.match.params.id;

    this.props.groupsStore.groupSub(groupId);
    this.props.usersStore.usersSub(groupId);
    this.props.expensesStore.expensesSub(groupId);
    this.props.manualTransactionsStore.manualTransactionsSub(groupId);
    this.props.expensesSettingsStore.expensesSettingsSub(groupId);
  }

  componentWillUnmount() {
    this.props.groupsStore.resetGroup();
    this.props.usersStore.resetUsers();
    this.props.expensesStore.resetExpenses();
    this.props.manualTransactionsStore.resetManualTransactions();
    this.props.expensesSettingsStore.resetExpensesSettings();
  }

  render() {
    const { groupsStore, usersStore, expensesStore, manualTransactionsStore, expensesSettingsStore } = this.props;

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
        <Expenses
          groupId={groupsStore.group?.id}
          users={usersStore.users}
          expenses={expensesStore.expenses}
          manualTransactions={manualTransactionsStore.manualTransactions}
          expensesSettings={expensesSettingsStore.expensesSettings}
        />
      </div>
    );
  }
}

export default Group;
