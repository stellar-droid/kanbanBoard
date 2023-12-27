// DRAG DROP CONTEXT Containing all the drag and drop contents

import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import TaskForm from "./TaskForm";
import { Modal, Paper } from "@mui/material";
export default function KanbanBoard() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const staticData = [
    { userId: 1, id: 1, title: "Device 1", completed: false },
    { userId: 2, id: 2, title: "Device 2", completed: false },
    { userId: 3, id: 3, title: "Device 3", completed: true },
    { userId: 4, id: 4, title: "Device 4", completed: true },
    { userId: 5, id: 5, title: "Device 5", completed: true },
    { userId: 6, id: 6, title: "Device 6", completed: true },
    { userId: 7, id: 7, title: "Device 7", completed: true },
    { userId: 8, id: 8, title: "Device 8", completed: true },
    { userId: 9, id: 9, title: "Device 9", completed: true },
    { userId: 10, id: 10, title: "Device 10", completed: true },
    { userId: 11, id: 11, title: "Device 11", completed: false },
    { userId: 12, id: 12, title: "Device 12", completed: true },
    { userId: 13, id: 13, title: "Device 13", completed: false },
    { userId: 14, id: 14, title: "Device 14", completed: true },
    { userId: 15, id: 15, title: "Device 15", completed: false },
    { userId: 16, id: 16, title: "Device 16", completed: true },
    { userId: 17, id: 17, title: "Device 17", completed: false },
    { userId: 18, id: 18, title: "Device 18", completed: true },
    { userId: 19, id: 19, title: "Device 19", completed: false },
    { userId: 20, id: 20, title: "Device 20", completed: true },
    { userId: 21, id: 21, title: "Device 21", completed: false },
    { userId: 22, id: 22, title: "Device 22", completed: true },
    { userId: 23, id: 23, title: "Device 23", completed: false },
    { userId: 24, id: 24, title: "Device 24", completed: true },
    { userId: 25, id: 25, title: "Device 25", completed: false },
    { userId: 26, id: 26, title: "Device 26", completed: true },
    { userId: 27, id: 27, title: "Device 27", completed: false },
    { userId: 28, id: 28, title: "Device 28", completed: true },
    { userId: 29, id: 29, title: "Device 29", completed: false },
    { userId: 30, id: 30, title: "Device 30", completed: true },
    { userId: 31, id: 31, title: "Device 31", completed: false },
    { userId: 32, id: 32, title: "Device 32", completed: true },
    { userId: 33, id: 33, title: "Device 33", completed: false },
    { userId: 34, id: 34, title: "Device 34", completed: true },
    { userId: 35, id: 35, title: "Device 35", completed: false },
    { userId: 36, id: 36, title: "Device 36", completed: true },
    { userId: 37, id: 37, title: "Device 37", completed: false },
    { userId: 38, id: 38, title: "Device 38", completed: true },
    { userId: 39, id: 39, title: "Device 39", completed: false },
    { userId: 40, id: 40, title: "Device 40", completed: true },
    { userId: 41, id: 41, title: "Device 41", completed: false },
    { userId: 42, id: 42, title: "Device 42", completed: true },
    { userId: 43, id: 43, title: "Device 43", completed: false },
    { userId: 44, id: 44, title: "Device 44", completed: true },
    { userId: 45, id: 45, title: "Device 45", completed: false },
    { userId: 46, id: 46, title: "Device 46", completed: true },
    { userId: 47, id: 47, title: "Device 47", completed: false },
    { userId: 48, id: 48, title: "Device 48", completed: true },
    { userId: 49, id: 49, title: "Device 49", completed: false },
    { userId: 50, id: 50, title: "Device 50", completed: true },
    // Add more tasks as needed
  ];

  useEffect(() => {
    // Use static data instead of fetching from the API
    const incompleteTasks = staticData.filter((task) => !task.completed);
    const completedTasks = staticData.filter((task) => task.completed);

    setIncomplete(incompleteTasks);
    setCompleted(completedTasks);

    // Add event listener for the Escape key
    document.addEventListener("keydown", handleEscapeKey);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      closeForm();
    }
  };

  // const handleDragEnd = (result) => {
  //   const { destination, source, draggableId } = result;

  //   if (source.droppableId == destination.droppableId) return;

  //   //REMOVE FROM SOURCE ARRAY

  //   if (source.droppableId == 2) {
  //     setCompleted(removeItemById(draggableId, completed));
  //   } else {
  //     setIncomplete(removeItemById(draggableId, incomplete));
  //   }

  //   // GET ITEM

  //   const task = findItemById(draggableId, [...incomplete, ...completed]);

  //   //ADD ITEM
  //   if (destination.droppableId == 2) {
  //     setCompleted([{ ...task, completed: !task.completed }, ...completed]);
  //   } else {
  //     setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
  //   }
  // };

  // function findItemById(id, array) {
  //   return array.find((item) => item.id == id);
  // }

  // function removeItemById(id, array) {
  //   return array.filter((item) => item.id != id);
  // }

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    console.log("Dragged Task Id:", draggableId);

    // If there is no destination or the item is dropped in the same place
    if (!destination || destination.droppableId === source.droppableId) {
      // Rearrange tasks within the same rack
      const updatedTasks =
        source.droppableId === "1"
          ? Array.from(incomplete)
          : Array.from(completed);
      const [removedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, removedTask);

      if (source.droppableId === "1") {
        setIncomplete(updatedTasks);
      } else {
        setCompleted(updatedTasks);
      }
      setIsFormOpen(true);
      return;
    }

    // If dragging between racks
    const task =
      source.droppableId === "2"
        ? completed[source.index]
        : incomplete[source.index];

    // Remove the task from the source rack
    const updatedSource =
      source.droppableId === "2"
        ? Array.from(completed)
        : Array.from(incomplete);
    updatedSource.splice(source.index, 1);

    // Update the destination rack with the task at the correct position
    const updatedDestination =
      destination.droppableId === "2"
        ? Array.from(completed)
        : Array.from(incomplete);
    updatedDestination.splice(destination.index, 0, {
      ...task,
      completed: destination.droppableId === "2",
    });

    // Check the length of the destination rack after rearranging
    if (updatedDestination.length > 42) {
      // Rack is full, prevent dropping
      return;
    }

    // Update state with the new task positions
    setCompleted(
      destination.droppableId === "2" ? updatedDestination : updatedSource
    );
    setIncomplete(
      destination.droppableId === "1" ? updatedDestination : updatedSource
    );

    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>Rack View </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Column
          title={"Rack 1"}
          tasks={incomplete}
          id={"1"}
          style={{ zIndex: 1 }}
        />
        <Column
          title={"Rack 2"}
          tasks={completed}
          id={"2"}
          style={{ zIndex: 2 }}
        />
        {/* <Column title={"Rack 3"} tasks={[]} id={"3"} /> */}
         (
          
          <Modal open={isFormOpen} >
            <Paper style={{height:'570px',width:700}}>
            <TaskForm onClose={closeForm} />
            </Paper>
          </Modal>
        ){" "}
        {/* Render the form when isFormOpen is true */}
      </div>
    </DragDropContext>
  );
}
