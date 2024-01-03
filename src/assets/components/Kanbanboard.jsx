// DRAG DROP CONTEXT Containing all the drag and drop contents

import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import TaskForm from "./TaskForm";
import { Modal, Paper } from "@mui/material";
export default function KanbanBoard() {
  const [rack1, setRack1] = useState([""]);
  const [rack2, setRack2] = useState([""]);
  const [rack3, setRack3] = useState([""]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [action, setAction] = useState(true);

  const staticData = [
    { userId: 1, id: 1, title: "Device 1", rack: "1" },
    { userId: 2, id: 2, title: "Device 2", rack: "1" },
    { userId: 3, id: 3, title: "Device 3", rack: "2" },
    { userId: 4, id: 4, title: "Device 4", rack: "2" },
    { userId: 5, id: 5, title: "Device 5", rack: "3" },
    { userId: 6, id: 6, title: "Device 6", rack: "3" },
    // { userId: 7, id: 7, title: "Device 7", rack: true },
    // { userId: 8, id: 8, title: "Device 8", rack: true },
    // { userId: 9, id: 9, title: "Device 9", rack: true },
    // { userId: 10, id: 10, title: "Device 10", rack: true },
    // { userId: 11, id: 11, title: "Device 11", rack: false },
    // { userId: 12, id: 12, title: "Device 12", rack: true },
    // { userId: 13, id: 13, title: "Device 13", rack: false },
    // { userId: 14, id: 14, title: "Device 14", rack: true },
    // { userId: 15, id: 15, title: "Device 15", rack: false },
    // { userId: 16, id: 16, title: "Device 16", rack: true },
    // { userId: 17, id: 17, title: "Device 17", rack: false },
    // { userId: 18, id: 18, title: "Device 18", rack: true },
    // { userId: 19, id: 19, title: "Device 19", rack: false },
    // { userId: 20, id: 20, title: "Device 20", rack3: true }
    // { userId: 21, id: 21, title: "Device 21", rack: false },
    // { userId: 22, id: 22, title: "Device 22", rack: false },
    // { userId: 23, id: 23, title: "Device 23", rack: false },
    // { userId: 24, id: 24, title: "Device 24", rack: true },
    // { userId: 25, id: 25, title: "Device 25", rack: true },
    // { userId: 26, id: 26, title: "Device 26", rack: true },
    // { userId: 27, id: 27, title: "Device 27", rack: true },
    // { userId: 28, id: 28, title: "Device 28", rack: true },
    // { userId: 29, id: 29, title: "Device 29", rack: true },
    // { userId: 30, id: 30, title: "Device 30", rack: true },
    // { userId: 31, id: 31, title: "Device 31", rack: true },
    // { userId: 32, id: 32, title: "Device 32", rack: true },
    // { userId: 33, id: 33, title: "Device 33", rack: true },
    // { userId: 34, id: 34, title: "Device 34", rack: true },
    // { userId: 35, id: 35, title: "Device 35", rack: true },
    // { userId: 36, id: 36, title: "Device 36", rack: true },
    // { userId: 37, id: 37, title: "Device 37", rack: true },
    // { userId: 38, id: 38, title: "Device 38", rack: true },
    // { userId: 39, id: 39, title: "Device 39", rack: true },
    // { userId: 40, id: 40, title: "Device 40", rack: true },
    // { userId: 41, id: 41, title: "Device 41", rack: true },
    // { userId: 42, id: 42, title: "Device 42", rack: true },
    // { userId: 43, id: 43, title: "Device 43", rack: true },
    // { userId: 44, id: 44, title: "Device 44", rack: true },
    // { userId: 45, id: 45, title: "Device 45", rack: true },
    // { userId: 46, id: 46, title: "Device 46", rack: true },
    // { userId: 47, id: 47, title: "Device 47", rack: true },
    // { userId: 48, id: 48, title: "Device 48", rack: true },
    // { userId: 49, id: 49, title: "Device 49", rack: true },
    // { userId: 50, id: 50, title: "Device 50", rack: true },
    // Add more tasks as needed
  ];

  // <-------------------USE EFFECT----------------->
  useEffect(() => {
    // Use static data instead of fetching from the API
    const rack1 = staticData.filter((task) => task.rack === "1");
    const rack2 = staticData.filter((task) => task.rack === "2");
    const rack3 = staticData.filter((task) => task.rack === "3");

    setRack1(rack1);
    setRack2(rack2);
    setRack3(rack3);

    // Add event listener for the Escape key
    document.addEventListener("keydown", handleEscapeKey);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);
  // USE EFFECT ENDS

  // <-------------------HANDLE ESCAPE KEY----------------->
  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      closeForm();
    }
  };
  // <-------------------HANDLE ESCAPE KEY ENDS----------------->

  // <-------------------HANDLE DRAG START----------------->
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
   
  
    console.log("Dragged Device Id:", draggableId);
    console.log("Source Rack Id:", source.droppableId);
    console.log("Destination Rack Id:", destination.droppableId);
    console.log("Destination Rack Index:", destination.index);
    console.log("Source Rack Index:", source.index);
  
    // If there is no destination or the item is dropped in the same place
    if (!destination || destination.droppableId === source.droppableId) {
      // Rearrange tasks within the same rack
      const updatedRack =
        source.droppableId === "1"
          ? Array.from(rack1)
          : source.droppableId === "2"
          ? Array.from(rack2)
          : Array.from(rack3);
      const [removedTask] = updatedRack.splice(source.index, 1);
      updatedRack.splice(destination.index, 0, removedTask);
  
      if (source.droppableId === "1") {
        setRack1(updatedRack);
      } else if (source.droppableId === "2") {
        setRack2(updatedRack);
      } else if (source.droppableId === "3") {
        setRack3(updatedRack);
      }
  
      setIsFormOpen(true);
      return;
    }
  
    // If dragging between racks
    const task =
      source.droppableId === "2"
        ? rack2[source.index]
        : source.droppableId === "3"
        ? rack3[source.index]
        : rack1[source.index];
  
    // Remove the task from the source rack
    const updatedSource =
      source.droppableId === "2"
        ? Array.from(rack2)
        : source.droppableId === "3"
        ? Array.from(rack3)
        : Array.from(rack1);
    updatedSource.splice(source.index, 1);
  
    // Update the destination rack with the task at the correct position
    const updatedDestination =
      destination.droppableId === "2"
        ? Array.from(rack2)
        : destination.droppableId === "3"
        ? Array.from(rack3)
        : Array.from(rack1);
    updatedDestination.splice(destination.index, 0, {
      ...task,
      rack1: destination.droppableId === "1",
      rack2: destination.droppableId === "2",
      rack3: destination.droppableId === "3",
    });
  
    // Check the length of the destination rack after rearranging
    if (updatedDestination.length > 42) {
      // Rack is full, prevent dropping
      return alert("Rack is full!");
    }
  
    // Update state with the new task positions
    if (source.droppableId === "1") {
      setRack1(updatedSource);
    } else if (source.droppableId === "2") {
      setRack2(updatedSource);
    } else if (source.droppableId === "3") {
      setRack3(updatedSource);
    }
  
    if (destination.droppableId === "1") {
      setRack1(updatedDestination);
    } else if (destination.droppableId === "2") {
      setRack2(updatedDestination);
    } else if (destination.droppableId === "3") {
      setRack3(updatedDestination);
    }
  
    alert('you dragged the device no. '+draggableId+' from rack no. '+source.droppableId+' to rack no. '+destination.droppableId+'at index '+destination.index);
    setIsFormOpen(true);
  };
  
  // <-------------------HANDLE DRAG START ENDS----------------->

  // <-------------------OPEN FORM----------------->
  const closeForm = () => {
    setIsFormOpen(false);
  };
  // <-------------------OPEN FORM ENDS----------------->

  // <-------------------DELETE DEVICE STARTS----------------->
  const onDelete = (taskId) => {
    // Implement the logic to delete the task with the specified taskId
    const updatedRack2 = rack2.filter((task) => task.id !== taskId);
    const updatedRack1 = rack1.filter((task) => task.id !== taskId);
    const updatedRack3 = rack3.filter((task) => task.id !== taskId);

    setRack2(updatedRack2);
    setRack1(updatedRack1);
    setRack3(updatedRack3);
        console.log(" Deleted Device : ", taskId);
  };
  // <-------------------DELETE DEVICE ENDS----------------->

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
          tasks={rack1}
          id={"1"}
          style={{ zIndex: 1 }}
          onDelete={onDelete}
        />
        <Column
          title={"Rack 2"}
          tasks={rack2}
          id={"2"}
          style={{ zIndex: 2 }}
          onDelete={onDelete}
        />
        <Column
          title={"Rack 3"}
          tasks={rack3}
          id={"3"}
          style={{ zIndex: 2 }}
          onDelete={onDelete}
        />
        {/* <Column title={"Rack 3"} tasks={[]} id={"3"} /> */}
        <Modal open={isFormOpen} onKeyDown={handleEscapeKey}>
          {/* <Paper style={{height:'570px',width:700}}> */}
          <TaskForm onClose={closeForm} action={action} setAction={setAction} />
          {/* </Paper> */}
        </Modal>{" "}
        {/* Render the form when isFormOpen is true */}
      </div>
    </DragDropContext>
  );
}
