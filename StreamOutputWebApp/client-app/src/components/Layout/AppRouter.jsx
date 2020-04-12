import React from "react";
import { Switch, Route } from "react-router-dom"; //use HashRouter if there is errors on static gh-pages
import ExpenseTracker from "../ExpenseTracker/ExpenseTracker";
import SignalRStream from "../SignalrStream/Stream";
import ExampleHighlighter from "../SyntaxHighlighter/ExampleHighlighter";
import GithubFeaturedList from "../SyntaxHighlighter/GithubFeatured/GithubFeaturedList";
import HoverableTableExample from "../SyntaxHighlighter/tables/HoverableTableExample";
import DraggableExample from "../draggableComponent/DraggableExample";

export default function AppRouter() {
  return (
    <Switch>
      <Route exact path="/" component={ExampleHighlighter} />
      <Route exact path="/stream" component={SignalRStream} />
      <Route exact path="/expenses" component={ExpenseTracker} />
      <Route exact path="/featured" component={GithubFeaturedList} />
      <Route exact path="/table" component={HoverableTableExample} />
      <Route exact path="/drag" component={DraggableExample} />
    </Switch>
  );
}

//Scroll to element in view https://stackoverflow.com/questions/43441856/reactjs-how-to-scroll-to-an-element
// or https://stackoverflow.com/questions/40280369/use-anchors-with-react-router

//Router info https://reacttraining.com/react-router/web/api/BrowserRouter (browser router /hash router (for static files) should wrap whole App.js in index.js to work properly!)
//could also use next.js routing https://nextjs.org/docs/routing/introduction

//useEffect() ...runs after state update and screen repaint by browser
//data fetching :https://www.robinwieruch.de/react-hooks-fetch-data
/*React remembers the effect function you provided, and runs it after flushing changes to the DOM and letting the browser paint the screen.
 Inside the scope of a single render, props and state stay the same. 
 
 FETCHING  EXAMPLE with query saved to state;
function Parent() {
  const [query, setQuery] = useState('react');

  // ✅ Preserves identity until query changes
  const fetchData = useCallback(() => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + query;
    // ... Fetch data and return it ...
  }, [query]);  // ✅ Callback deps are OK

  return <Child fetchData={fetchData} />
}

function Child({ fetchData }) {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]); // ✅ Effect deps are OK

  // ...
}
Since fetchData only changes inside Parent when its query state changes, our Child won’t refetch the data until it’s actually necessary for the app.
*/

//useRef() faq --https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
// Like obj instance variable (mutable)
/*Example
 function Example() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    // Set the mutable latest value
    latestCount.current = count;
    setTimeout(() => {
      // Read the mutable latest value
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });
  // ...
  */
