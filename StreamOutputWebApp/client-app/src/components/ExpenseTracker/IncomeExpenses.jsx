import React, { useContext } from "react";
import { GlobalContext } from "../../context-providers/GlobalContextProvider";
import styles from "./expenses.module.css";

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  //TO DEFINE MORE css module classes use
  //className={`${styles.description} ${styles.yellow}`}
  return (
    <div className={styles.inc_exp_container}>
      <div>
        <h4 className={styles.h4expenses}>Income</h4>
        <p className={`${styles.moneyexp} ${styles.plus}`}>{income}</p>
      </div>
      <div>
        <h4 className={styles.h4expenses}>Expense</h4>
        <p className={`${styles.moneyexp} ${styles.minus}`}>{expense}</p>
      </div>
    </div>
  );
};
