import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

export default function Column({ colId, title, tasks, addTask, removeTask, color }) {  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (!input) return;
    addTask(colId, input);
    setInput("");
  };

  return (
    <div
  style={{
    background: color || "#f0f4f8", // <- use prop, fallback to default
    padding: "15px",
    borderRadius: "8px",
    width: "250px",
    minHeight: "250px",
    border: "2px solid #0077b6",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
  }}
>
      <h2 style={{ textTransform: "uppercase", marginBottom: "10px" }}>
        {title}
      </h2>

      <Droppable droppableId={colId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ flex: 1, minHeight: "50px" }}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: "10px",
                      margin: "6px 0",
                      background: "#ffffff",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      ...provided.draggableProps.style,
                    }}
                  >
                    <span>{task.text}</span>
                    <button
                      onClick={() => removeTask(colId, task.id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        padding: "2px 6px",
                        cursor: "pointer",
                      }}
                    >
                      X
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
          placeholder={`+ Add task to ${title}`}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            marginBottom: "5px",
          }}
        />
        <button
          onClick={handleAddTask}
          style={{ width: "100%", padding: "8px", cursor: "pointer" }}
        >
          Add
        </button>
      </div>
    </div>
  );
}