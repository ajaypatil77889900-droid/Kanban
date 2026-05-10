import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../store/slices/tasksSlice";
import type { Priority, Status, Task } from "../types";
import "../styles/modal.css";

type FormState = {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
};

type Props = {
  open: boolean;
  onClose: () => void;
  editTask?: Task | null;
};

export default function AddTask({ open, onClose, editTask }: Props) {
  const dispatch = useDispatch();

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    priority: "low",
    status: "backlog",
  });

  // Populate form when editing OR reset when opening create mode
  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description,
        priority: editTask.priority,
        status: editTask.status,
      });
    } else {
      setForm({
        title: "",
        description: "",
        priority: "low",
        status: "backlog",
      });
    }
  }, [editTask, open]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.title.trim()) return;

    if (editTask) {
      dispatch(
        updateTask({
          id: editTask.id,
          updates: form,
        }),
      );
    } else {
      dispatch(
        addTask({
          id: Date.now().toString(),
          ...form,
        }),
      );
    }

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <h3>{editTask ? "Edit Task" : "Create New Task"}</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <input
          placeholder="Task name"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: e.target.value as Priority })
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value as Status })
          }
        >
          <option value="backlog">Backlog</option>
          <option value="inProgress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>

        <button onClick={handleSubmit} disabled={!form.title.trim()}>
          {editTask ? "Update Task" : "Add Task"}
        </button>
      </div>
    </div>
  );
}
