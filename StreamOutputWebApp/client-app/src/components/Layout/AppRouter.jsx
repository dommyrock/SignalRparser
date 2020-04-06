import React from "react";
import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom"; //use HashRouter if there is errors on static gh-pages
import ExpenseTracker from "../ExpenseTracker/ExpenseTracker";
import SignalRStream from "../SignalrStream/Stream";
import ExampleHighlighter from "../SyntaxHighlighter/ExampleHighlighter";
import GithubFeaturedList from "../SyntaxHighlighter/GithubFeatured/GithubFeaturedList";
import HoverableTableExample from "../SyntaxHighlighter/tables/HoverableTableExample";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ExampleHighlighter} />
        <Route exact path="/expenses" component={ExpenseTracker} />
        <Route exact path="/stream" component={SignalRStream} />
        <Route exact path="/featured" component={GithubFeaturedList} />
        <Route exact path="/table" component={HoverableTableExample} />
      </Switch>
    </BrowserRouter>
  );
};
export default AppRouter;
