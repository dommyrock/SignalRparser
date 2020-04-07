import React from "react";
import Draggablecolumns from "./DraggableLists";
import { uuidv4 } from "../../utils/helpers";
import { GlobalContext } from "../../context-providers/GlobalContextProvider";

const initialState = {
  transactions: [],
  mockTasks: [
    { id: uuidv4(), content: "First task" },
    { id: uuidv4(), content: "Second task" },
    { id: uuidv4(), content: "Third task" },
    { id: uuidv4(), content: "Fourth task" },
  ],
};

const DraggableExample = () => {
  const { tasksFromBackend } = React.useContext(GlobalContext);

  console.log(tasksFromBackend);

  // const [state, setstate] = React.useState(tasksFromBackend); remove exta
  //remember to spread so we get array of objects out (not the [objects], one level lower.)!
  // const formated = [
  //   ...transactions.map((object) => {
  //     console.log("new obj id: " + object.id);

  //     let newObj = {};
  //     newObj.id = object.id;
  //     newObj.content = object.text;
  //     return newObj;
  //   }),
  // ];

  const columnsFromBackend = {
    [uuidv4()]: {
      name: "Requested",
      items: initialState.mockTasks, //TODO...look component structura and figure where to insert this DragList comp
    },
    [uuidv4()]: {
      name: "Done",
      items: [],
    },
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
    <div>
      <Draggablecolumns {...columnsFromBackend} />
    </div>
  );
};

export default DraggableExample;

// console.log(tasksFromBackend); conclusion ... need to addchildren to Draglisr comp...DragListItems and render each
