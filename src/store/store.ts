import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("kanban_state", JSON.stringify(store.getState().tasks));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
