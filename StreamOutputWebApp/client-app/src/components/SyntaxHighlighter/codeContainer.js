export const jscode = `const dictionary = {the: 22038615, be: 12545825, and: 10741073, 
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
//Optimized HashMap implementation
const tx1 = "${key}${typeof key}";
export const optimalHMImplementation = `
class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity);
    this.loadFactor = loadFactor;
    this.size = 0;
    this.collisions = 0;
    this.keys = [];
  }

  hash(key) {
    let hashValue = 0;
    const stringTypeKey = '${tx1}' ;

    for (let index = 0; index < stringTypeKey.length; index++) {
      const charCode = stringTypeKey.charCodeAt(index);
      hashValue += charCode << (index * 8);
    }

    return hashValue;
  }


  _getBucketIndex(key) {
    const hashValue = this.hash(key);
    const bucketIndex = hashValue % this.buckets.length;
    return bucketIndex;
  }

  set(key, value) {
    const {bucketIndex, entryIndex} = this._getIndexes(key);

    if(entryIndex === undefined) {
      // initialize array and save key/value
      const keyIndex = this.keys.push({content: key}) - 1; // keep track of the key index
      this.buckets[bucketIndex] = this.buckets[bucketIndex] || [];
      this.buckets[bucketIndex].push({key, value, keyIndex});
      this.size++;
      // Optional: keep count of collisions
      if(this.buckets[bucketIndex].length > 1) { this.collisions++; }
    } else {
      // override existing value
      this.buckets[bucketIndex][entryIndex].value = value;
    }

    // check if a rehash is due
    if(this.loadFactor > 0 && this.getLoadFactor() > this.loadFactor) {
      this.rehash(this.buckets.length * 2);
    }

    return this;
  }

  get(key) {
    const {bucketIndex, entryIndex} = this._getIndexes(key);

    if(entryIndex === undefined) {
      return;
    }

    return this.buckets[bucketIndex][entryIndex].value;
  }

  has(key) {
    return !!this.get(key);
  }

  _getIndexes(key) {
    const bucketIndex = this._getBucketIndex(key);
    const values = this.buckets[bucketIndex] || [];

    for (let entryIndex = 0; entryIndex < values.length; entryIndex++) {
      const entry = values[entryIndex];
      if(entry.key === key) {
        return {bucketIndex, entryIndex};
      }
    }

    return {bucketIndex};
  }

  delete(key) {
    const {bucketIndex, entryIndex, keyIndex} = this._getIndexes(key);

    if(entryIndex === undefined) {
      return false;
    }

    this.buckets[bucketIndex].splice(entryIndex, 1);
    delete this.keys[keyIndex];
    this.size--;

    return true;
  }

  rehash(newCapacity) {
    const newMap = new HashMap(newCapacity);

    this.keys.forEach(key => {
      if(key) {
        newMap.set(key.content, this.get(key.content));
      }
    });

    // update bucket
    this.buckets = newMap.buckets;
    this.collisions = newMap.collisions;
    // Optional: both "keys" has the same content except that the new one doesn't have empty spaces from deletions
    this.keys = newMap.keys;
  }

  getLoadFactor() {
    return this.size / this.buckets.length;
  }
}
`;
