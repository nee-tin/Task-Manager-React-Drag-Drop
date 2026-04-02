import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";

export default function App() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("taskColumns");
    return saved
      ? JSON.parse(saved)
      : {
          todo: [{ id: "1", text: "Learn React" }],
          inprogress: [{ id: "2", text: "Build Project" }],
          done: [{ id: "3", text: "Deploy App" }],
        };
  });

    const columnColors = {
    todo: "#fff3b0",       // yellow
    inprogress: "#ffd6a5", // orange
    done: "#caffbf",       // green
  };


  const updateColumns = (newCols) => {
    setColumns(newCols);
    localStorage.setItem("taskColumns", JSON.stringify(newCols));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceCol = Array.from(columns[source.droppableId]);
    const destCol = Array.from(columns[destination.droppableId]);
    const [moved] = sourceCol.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, moved);
      updateColumns({ ...columns, [source.droppableId]: sourceCol });
    } else {
      destCol.splice(destination.index, 0, moved);
      updateColumns({
        ...columns,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol,
      });
    }
  };

  const addTask = (colId, text) => {
    const newTask = { id: Date.now().toString(), text };
    updateColumns({ ...columns, [colId]: [...columns[colId], newTask] });
  };

  const removeTask = (colId, taskId) => {
    const updated = columns[colId].filter((task) => task.id !== taskId);
    updateColumns({ ...columns, [colId]: updated });
  };

  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",          // ✅ allows columns to wrap on small screens
        gap: "20px",
        justifyContent: "center",
      }}
    >
      {Object.keys(columns).map((colId) => (
        <Column
          key={colId}
          colId={colId}
          title={colId}
          tasks={columns[colId]}
          addTask={addTask}
          removeTask={removeTask}
          color={columnColors[colId]} // ✅ passes color to each column
        />
      ))}
    </div>
  </DragDropContext>
);
}