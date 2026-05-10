import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

export const selectAllTasks = (state: RootState) => state.tasks.tasks;

export const selectTasksByStatus = (status: string) =>
  createSelector([selectAllTasks], (tasks) =>
    tasks.filter((t) => t.status === status),
  );
