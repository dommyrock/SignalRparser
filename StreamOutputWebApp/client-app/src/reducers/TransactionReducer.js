export const DELETE_TRANSACTION = "DELETE_TRANSACTION";
export const ADD_TRANSACTION = "ADD_TRANSACTION";

//...state -->Copy previous state and only update transactions with specific action!
export function transactionReducer(state, action) {
  switch (action.type) {
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    default:
      return state;
  }
}
// reducers example https://github.com/academind/react-redux-vs-context/blob/context-hooks/src/context/reducers.js

//This these are "interface" methods implementations , and Context has method signatures(interface)...
