import React, { useContext } from "react";
import { Transaction } from "./Transaction";
import { GlobalContext } from "../../context-providers/GlobalContextProvider";
import styles from "./expenses.module.css";

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext); //this is the difference ....... i need to pass data from outside of this function like itemsFromBackend to items:

  return (
    <>
      <h3>History</h3>
      <ul className={styles.listexpenses}>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};

//sfc snippet for func component !!!!!!!!
