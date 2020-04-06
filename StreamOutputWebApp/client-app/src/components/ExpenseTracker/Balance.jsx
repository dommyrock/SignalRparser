import React, { useContext } from "react";
import { GlobalContext } from "../../context-providers/GlobalContextProvider";
import styles from "././expenses.module.css";
const inlineCss = {
  textAlign: "center",
};
export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
      <h4 className={styles.h4expenses} style={inlineCss}>
        Your Balance
      </h4>
      <h1 className={styles.h1expenses} style={inlineCss}>
        ${total}
      </h1>
    </>
  );
};
