import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchTasksFromApi } from "../../services/api";

import type { Task, Status } from "../../types";

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const saved = localStorage.getItem("kanban_state");

const initialState: TasksState = saved
  ? JSON.parse(saved)
  : { tasks: [], loading: false, error: null };

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async () => await fetchTasksFromApi(),
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    markDone(state, action: PayloadAction<string>) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.status = "done";
    },
    moveTask(
      state,
      action: PayloadAction<{
        sourceCol: Status;
        destCol: Status;
        sourceIndex: number;
        destIndex: number;
      }>,
    ) {
      const { sourceCol, destCol, sourceIndex, destIndex } = action.payload;

      // 1 Get indexes of tasks in source column
      const sourceTasksIndexes = state.tasks
        .map((t, i) => ({ t, i }))
        .filter((x) => x.t.status === sourceCol)
        .map((x) => x.i);

      // 2 Get the real index in state.tasks
      const realSourceIndex = sourceTasksIndexes[sourceIndex];

      // 3 Remove task
      const [movedTask] = state.tasks.splice(realSourceIndex, 1);

      // 4 Update status
      movedTask.status = destCol;

      // 5 Get destination indexes AFTER removal
      const destTasksIndexes = state.tasks
        .map((t, i) => ({ t, i }))
        .filter((x) => x.t.status === destCol)
        .map((x) => x.i);

      // 6 Calculate correct insert index
      const insertIndex = destTasksIndexes[destIndex] ?? state.tasks.length;

      // 7 Insert task
      state.tasks.splice(insertIndex, 0, movedTask);
    },
    updateTask: (state, action) => {
      const { id, updates } = action.payload;

      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        Object.assign(task, updates);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;

        state.tasks = action.payload.map((task) => ({
          ...task,
          status: task.status as Status,
        }));
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load tasks";
      });
  },
});

export const { addTask, deleteTask, markDone, moveTask, updateTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
