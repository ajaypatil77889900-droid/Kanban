import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import Column from "../components/Column";
import AddTaskModal from "../components/AddTask";
import { useDispatch } from "react-redux";
import { moveTask } from "../store/slices/tasksSlice";
import { useState } from "react";
import "../styles/board.css";
import { columns } from "../constants";

export default function Board() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    dispatch(
      moveTask({
        sourceCol: result.source.droppableId as any,
        destCol: result.destination.droppableId as any,
        sourceIndex: result.source.index,
        destIndex: result.destination.index,
      }),
    );
  };

  return (
    <>
      <div className="board-header">
        <h2 className="board-title">Kanban Board</h2>

        <button className="add-btn" onClick={() => setOpen(true)}>
          + Add Task
        </button>
      </div>

      <AddTaskModal open={open} onClose={() => setOpen(false)} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {columns.map((col) => (
            <Column key={col.id} id={col.id} title={col.title} />
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
