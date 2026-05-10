import { Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { deleteTask, markDone } from "../store/slices/tasksSlice";
import "../styles/task.css";
import React, { useState } from "react";
import AddTask from "./AddTask";

export default React.memo(function TaskCard({ task, index }: any) {
  const dispatch = useDispatch();
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(p, snapshot) => (
          <div
            ref={p.innerRef}
            {...p.draggableProps}
            {...p.dragHandleProps}
            className={`task ${task.priority}`}
            data-dragging={snapshot.isDragging}
            style={{
              ...p.draggableProps.style,
              boxShadow: snapshot.isDragging
                ? "0 8px 20px rgba(0,0,0,0.15)"
                : "none",
            }}
          >
            <button className="edit-btn" onClick={() => setEditOpen(true)}>
              ✏️
            </button>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <span className="badge">{task.priority}</span>

            <div className="actions">
              {task.status !== "done" && (
                <button onClick={() => dispatch(markDone(task.id))}>
                  Done
                </button>
              )}
              <button onClick={() => dispatch(deleteTask(task.id))}>
                Delete
              </button>
            </div>
          </div>
        )}
      </Draggable>
      <AddTask
        open={editOpen}
        onClose={() => setEditOpen(false)}
        editTask={task}
      />
    </>
  );
});
