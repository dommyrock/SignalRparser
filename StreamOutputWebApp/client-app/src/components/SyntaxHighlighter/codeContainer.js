export const code = `const dictionary = {the: 22038615, be: 12545825, and: 10741073, 
    of: 10343885, a: 10144200, in: 6996437, to: 6332195 /* ... */};
  
  function etWordFrequency(dictionary, word) {
    return dictionary[word];
  }
  
  console.log(getWordFrequency(dictionary, 'the'));
  console.log(getWordFrequency(dictionary, 'in'));
  `;
export const csscode = `
  .archive {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    grid-gap: 32px;
    grid-auto-flow: dense;
  }
  
  /* Extra-wide grid-posts */
  .article:nth-child(31n + 1) {
    grid-column: 1 / -1;
  }
  .article:nth-child(16n + 2) {
    grid-column: -3 / -1;
  }
  .article:nth-child(16n + 10) {
    grid-column: 1 / -2;
  }
  
  /* Single column display for phones */
  @media (max-width: 459px) {
    .archive {
      display: flex;
      flex-direction: column;
    }
  }
  `;

export const jsxcode = `
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
  `;
