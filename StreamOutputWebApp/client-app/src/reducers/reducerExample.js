//reducer example -- usReducer hook (good option when we have multiple states to manage , and actions that mutate states)
const initState = 0;
//reducer to pass to useReducer() as parameter
const reducer = (state, action) => {
  switch (action) {
    case "increment":
      return state + 1;

    case "decrement":
      return state - 1;

    case "reset":
      return 0;

    default:
      throw new Error("Unexpected action.");
  }
};
