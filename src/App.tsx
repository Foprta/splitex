import React from "react";
import { Provider } from "mobx-react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Landing from "./components/Landing";
import Group from "./components/Group/Group";
import groupsStore from "./stores/groups.store";
import usersStore from "./stores/users.store";
import expensesStore from "./stores/expenses.store";
import manualTransactionsStore from "./stores/manual-transactions.store";
import expensesSettingsStore from "./stores/expenses-settings.store";

const stores = { groupsStore, usersStore, expensesStore, manualTransactionsStore, expensesSettingsStore };

function App() {
  return (
    <Provider {...stores}>
      <BrowserRouter>
        <div className="flex flex-col w-full h-full items-center justify-center">
          <Link className="font-bold text-3xl mb-4" to="/">
            SplitEx
          </Link>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/:id" component={Group} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
