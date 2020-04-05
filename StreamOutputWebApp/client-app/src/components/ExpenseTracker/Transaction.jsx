import React, { useContext } from "react";
import { GlobalContext } from "../../context-providers/GlobalContextProvider";
import styles from "./expenses.module.css";

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li className={transaction.amount < 0 ? `${styles.minus}` : `${styles.plus}`}>
      {transaction.text}{" "}
      <span>
        {sign}${Math.abs(transaction.amount)}
      </span>
      <button onClick={() => deleteTransaction(transaction.id)} className={styles.deletebtnexpenses}>
        x
      </button>
    </li>
  );
};
