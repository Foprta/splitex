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
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Link className="mb-3 text-3xl font-bold clickable" to="/">
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
