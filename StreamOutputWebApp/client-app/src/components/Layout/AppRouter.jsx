import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ExpenseTracker from "../ExpenseTracker/ExpenseTracker";
import SignalRStream from "../SignalrStream/Stream";
import ExampleHighlighter from "../SyntaxHighlighter/ExampleHighlighter";
import GithubFeaturedList from "../SyntaxHighlighter/GithubFeatured/GithubFeaturedList";
import RoundedTable from "../SyntaxHighlighter/tables/HoverableTableExample";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/expenses" component={ExpenseTracker} />
        <Route exact path="/stream" component={SignalRStream} />
        <Route exact path="/code-example" component={ExampleHighlighter} />
        <Route exact path="/featured" component={GithubFeaturedList} />
        <Route exact path="/table" component={RoundedTable} />
      </Switch>
    </BrowserRouter>
  );
};
export default AppRouter;
