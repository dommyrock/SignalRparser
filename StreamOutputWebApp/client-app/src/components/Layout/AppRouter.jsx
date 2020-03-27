import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ExpenseTracker from "../ExpenseTracker/ExpenseTracker";
import SignalRStream from "../SignalrStream/Stream";
import { GlobalProvider } from "../../context-providers/GlobalStateProvider";
import SyntaxHighlighter from "../SyntaxHighlighter/SyntaxHighlighterMain";

//if i move aby route outside of GlobalProvider context thex dont render ...
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <GlobalProvider>
          <Route exact path="/expenses" component={ExpenseTracker} />
          <Route exact path="/stream" component={SignalRStream} />
          <Route exact path="/code" component={SyntaxHighlighter} />
        </GlobalProvider>
      </Switch>
    </BrowserRouter>
  );
};
export default AppRouter;
