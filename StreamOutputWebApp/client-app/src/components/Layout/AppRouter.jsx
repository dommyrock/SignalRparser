import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ExpenseTracker from "../ExpenseTracker/ExpenseTracker";
import SignalRStream from "../SignalrStream/Stream";
import ExampleHighlighter from "../SyntaxHighlighter/ExampleHighlighter";
import GithubFeaturedList from "../SyntaxHighlighter/GithubFeatured/GithubFeaturedList";
import RoundedTableExample from "../SyntaxHighlighter/tables/HoverableTableExample";
import test from "../SyntaxHighlighter/tables/HoverableTable";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/expenses" component={ExpenseTracker} />
        <Route exact path="/stream" component={SignalRStream} />
        <Route exact path="/code-example" component={ExampleHighlighter} />
        <Route exact path="/featured" component={GithubFeaturedList} />
        <Route exact path="/table" component={RoundedTableExample} />
        <Route exact path="/test" component={test} />
      </Switch>
    </BrowserRouter>
  );
};
export default AppRouter;
