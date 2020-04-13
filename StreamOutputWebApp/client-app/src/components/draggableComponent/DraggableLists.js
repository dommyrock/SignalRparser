import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import uuidv4 from "uuidv4/v4"; guid library, dont have npm for it here
import styles from "./draggable.module.css";
const DraggableList = (dataArray) => {
  // debugger;
  console.log(dataArray);

  const [columns, setColumns] = useState(dataArray); //was "columnsFromBackend"

  //#region event handlers
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  //#endregion

  return (
    <div className={styles.flex_container_main}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className={styles.flex_body_child} key={columnId}>
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                        }}
                        className={styles.flex_container}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      //   padding: 16,
                                      //   margin: "0 0 8px 0",
                                      //   minHeight: "50px",
                                      // backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86", //changes elements color onDrag
                                      backgroundImage: snapshot.isDragging
                                        ? "linear-gradient(-35deg, rgb(248, 232, 92), rgb(219, 93, 125), rgb(95, 121, 191))"
                                        : "linear-gradient(-35deg, rgb(248, 232, 92), rgb(219, 93, 125), rgb(139, 95, 191))",
                                      color: snapshot.isDragging ? "lightgrey" : "white",
                                      ...provided.draggableProps.style,
                                    }}
                                    className={styles.btn_gradient}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default DraggableList;

// component video @ https://www.youtube.com/watch?v=uHO3mQgs-e8
