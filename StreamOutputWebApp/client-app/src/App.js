import React from "react";
import AppRouter from "./components/Layout/AppRouter";
// import './App.css';

import { GlobalProvider } from "./context-providers/GlobalStateProvider";
function App() {
  return (
    <GlobalProvider>
      <AppRouter />
    </GlobalProvider>
  );
}

export default App;

// for context API see https://reactjs.org/docs/context.html
// passing dispatch deep in commponent tree https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down
// export providers to central Store component example https://medium.com/@samuelresua/global-state-with-react-context-cfa99946900d

/* 2nd example of  importing multiple context's to central one :example

 const compose = (contexts, children) =>
  contexts.reduce((acc, [Context, value]) => {
    return <Context.Provider value={value}>{acc}</Context.Provider>;
  }, children);
  
and use it as:

import Context1 from './context1';
import Context2 from './context2';
import Context3 from './context3';
...
import Context15 from './context15';

const MyComponent = (props) => {
  // const value1..15 = ... get the values from somewhere ;

  return compose(
    [
      [Context1, value1],
      [Context2, value2],
      [Context3, value3],
      ...
      [Context15, value15],
    ],
    <SomeSubComponent/>
  );
}

*/
