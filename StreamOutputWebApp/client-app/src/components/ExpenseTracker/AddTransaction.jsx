import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context-providers/GlobalContextProvider";
import { uuidv4 } from "../../utils/helpers";
import styles from "./expenses.module.css";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: uuidv4(),
      text,
      amount: +amount,
    };
    console.log(newTransaction.id);

    addTransaction(newTransaction);
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label className={styles.labelexpenses} htmlFor="text">
            Text
          </label>
          <input
            className={styles.inputexpenses}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
          />
        </div>
        <div className="form-control">
          <label className={styles.labelexpenses} htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            className={styles.inputexpenses}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className={styles.btnexpenses}>Add transaction</button>
      </form>
    </>
  );
};
