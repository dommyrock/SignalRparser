import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ExpenseTracker from "../ExpenseTracker/ExpenseTracker";
import SignalRStream from "../SignalrStream/Stream";
import SyntaxHighlighter from "../SyntaxHighlighter/SyntaxHighlighterMain";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/expenses" component={ExpenseTracker} />
        <Route exact path="/stream" component={SignalRStream} />
        <Route exact path="/code" component={SyntaxHighlighter} />
      </Switch>
    </BrowserRouter>
  );
};
export default AppRouter;
