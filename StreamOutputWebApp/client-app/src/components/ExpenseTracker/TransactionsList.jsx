import React, { useContext } from "react";
import { Transaction } from "./Transaction";
import { GlobalContext } from "../../context-providers/GlobalStateProvider";
import DragList from "../draggableComponent/DraggableLists";
import { uuidv4 } from "../../utils/helpers";

export const TransactionList = () => {
  const { transactions, tasksFromBackend } = useContext(GlobalContext); //this is the difference ....... i need to pass data from outside of this function like itemsFromBackend to items:

  //remember to spread so we get array of objects out (not the [objects], one level lower.)!
  const formated = [
    ...transactions.map(object => {
      console.log("new obj id: " + object.id);

      let newObj = {};
      newObj.id = object.id;
      newObj.content = object.text;
      return newObj;
    })
  ];
  const columnsFromBackend = {
    [uuidv4()]: {
      name: "Requested",
      items: tasksFromBackend //TODO...look component structura and figure where to insert this DragList comp
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
  // debugger;
  // console.log(tasksFromBackend); conclusion ... need to addchildren to Draglisr comp...DragListItems and render each
  // console.log("formated");
  // // console.log(...formated);
  // console.log(formated);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
      {/* <DragList {...columnsFromBackend} /> TODO -move this component to separate route and test adding items to it solo... than make route w nav bar/tabs for O(n)*/}
    </>
  );
};
