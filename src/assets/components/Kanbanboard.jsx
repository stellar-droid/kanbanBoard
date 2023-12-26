import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import TaskForm from "./TaskForm";
export default function KanbanBoard() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setCompleted(json.filter((task) => task.completed));
        setIncomplete(json.filter((task) => !task.completed));
      });
  }, []);

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
  
    // If there is no destination or the item is dropped in the same place
    if (!destination || destination.droppableId === source.droppableId) {
      // Rearrange tasks within the same rack
      const updatedTasks = source.droppableId === "1" ? Array.from(incomplete) : Array.from(completed);
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
    const task = source.droppableId === "2" ? completed[source.index] : incomplete[source.index];
  
    // Remove the task from the source rack
    const updatedSource = source.droppableId === "2" ? Array.from(completed) : Array.from(incomplete);
    updatedSource.splice(source.index, 1);
  
    // Update the destination rack with the task at the correct position
    const updatedDestination = destination.droppableId === "2" ? Array.from(completed) : Array.from(incomplete);
    updatedDestination.splice(destination.index, 0, { ...task, completed: destination.droppableId === "2" });
  
    // Update state with the new task positions
    setCompleted(destination.droppableId === "2" ? updatedDestination : updatedSource);
    setIncomplete(destination.droppableId === "1" ? updatedDestination : updatedSource);


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
        {isFormOpen && <TaskForm onClose={closeForm} />} {/* Render the form when isFormOpen is true */}
      </div>
    </DragDropContext>
  );
}
