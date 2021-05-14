import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Landing from "./components/Landing";
import Group from "./components/Group/Group";

function App() {
  return (
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
  );
}

export default App;
