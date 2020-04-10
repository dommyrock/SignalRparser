import React from "react";
import { Balance } from "../ExpenseTracker/Balance";
import { IncomeExpenses } from "../ExpenseTracker/IncomeExpenses";
import { TransactionList } from "../ExpenseTracker/TransactionsList";
import { AddTransaction } from "../ExpenseTracker/AddTransaction";
//CSS module (localized css --modifies class names on render...so they are unique)
import styles from "./expenses.module.css"; //https://create-react-app.dev/docs/adding-a-css-modules-stylesheet

const ExpenseTracker = () => {
  return (
    <>
      <div className={styles.bodyexpenses}>
        <h2 style={inlineCss}>Expense tracker</h2>
        <div className={styles.expensescontainer}>
          <Balance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </div>
    </>
  );
};
const inlineCss = {
  textAlign: "center",
};
export default ExpenseTracker;
