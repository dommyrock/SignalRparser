import React from "react";
import AppRouter from "./components/Layout/AppRouter";

// import { GlobalProvider } from "./context-providers/GlobalStateProvider";
// import './App.css';

function App() {
  return (
    // <GlobalProvider> moved to AppRouter (since its provider only for expenses component)
    <AppRouter />
    // </GlobalProvider>
  );
}

export default App;
