// PROVIDERS PROVIDE STATE AND METHODS TO CHILDREN NESTED IN THEM , WITHOUT PROVIDED STATE AND METHODS THEY DONT RENDER PROPERLY !
//NOTE : If i need separate ContextProviders...
//make "NewLocalContextProvider", duplicate this structure ,add it to same folder, than nest it in AppRouter above component that needs access to ctx
import React, { createContext, useReducer } from "react";
import { uuidv4 } from "../utils/helpers";
//Reducers (reducers contain functions for state mutations/updates)
import { transactionReducer, ADD_TRANSACTION, DELETE_TRANSACTION } from "../reducers/TransactionReducer";

// Initial state
const initialState = {
  transactions: [],
  mockTasks: [
    { id: uuidv4(), content: "First task" },
    { id: uuidv4(), content: "Second task" },
    { id: uuidv4(), content: "Third task" },
    { id: uuidv4(), content: "Fourth task" }
  ]
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = props => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  //#region  Actions

  //delete after 500ms delay (like debounce...)
  function deleteTransaction(transactionId) {
    setTimeout(() => {
      dispatch({ type: DELETE_TRANSACTION, payload: transactionId });
    }, 500);
  }

  function addTransaction(transaction) {
    dispatch({ type: ADD_TRANSACTION, payload: transaction });
  }
  //#endregion

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        mockTasks: state.mockTasks,
        deleteTransaction,
        addTransaction
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
