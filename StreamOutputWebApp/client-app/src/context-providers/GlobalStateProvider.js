import React, { createContext, useReducer } from "react";
import TransactionReducer from "../reducers/TransactionReducer";
import { uuidv4 } from "../utils/helpers";

// Initial state
const initialState = {
  transactions: [],
  mockTasks: [
    { id: uuidv4(), content: "First task" },
    { id: uuidv4(), content: "Second task" }, //Example ....replace thsi with transactions data
    { id: uuidv4(), content: "Third task" },
    { id: uuidv4(), content: "Fourth task" }
  ]
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TransactionReducer, initialState);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        mockTasks: state.mockTasks,
        deleteTransaction,
        addTransaction
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
