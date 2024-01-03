import { useEffect, useState } from "react";
import "./App.css";
import Column from "./assets/components/Column";
import KanbanBoard from "./assets/components/Kanbanboard";
import Task from "./assets/components/Task";
import DevicesStockList from "./assets/components/DevicesStockList";
function App() {
  return (
    <div className="App">
      <KanbanBoard />
      <DevicesStockList />
    </div>
  );
}

export default App;
