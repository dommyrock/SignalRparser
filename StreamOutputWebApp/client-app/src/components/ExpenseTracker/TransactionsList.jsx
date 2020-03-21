import React, { useContext } from "react";
import { Transaction } from "./Transaction";
import { GlobalContext } from "../../context-providers/GlobalStateProvider";

import DragList from "../draggableComponent/DraggableLists";
import { uuidv4 } from "../../utils/helpers";

const itemsFromBackend = [
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" }, //example
  { id: uuidv4(), content: "Third task" },
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" }, //example
  { id: uuidv4(), content: "Third task" },
  { id: uuidv4(), content: "First task" },
  { id: uuidv4(), content: "Second task" }, //example
  { id: uuidv4(), content: "Third task" }
];

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  const columnsFromBackend = {
    [uuidv4()]: {
      name: "Requested",
      items: itemsFromBackend //TODO...replace this with items from context
    },
    [uuidv4()]: {
      name: "Done",
      items: []
    }
    //uncomment to add more columns
    // [uuidv4()]: {
    //   name: "To do",
    //   items: []
    // },
    // [uuidv4()]: {
    //   name: "In Progress",
    //   items: []
    // }
  };

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
      <DragList {...columnsFromBackend} />
    </>
  );
};
