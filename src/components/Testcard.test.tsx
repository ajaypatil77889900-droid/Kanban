import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect, vi } from "vitest";
import Taskcard from "./Taskcard";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../store/slices/tasksSlice";

//  Mock drag & drop
vi.mock("@hello-pangea/dnd", () => ({
  Draggable: ({ children }: any) =>
    children(
      {
        innerRef: vi.fn(),
        draggableProps: {},
        dragHandleProps: {},
      },
      { isDragging: false },
    ),
}));

//  Mock task
const mockTask = {
  id: "1",
  title: "Test Task",
  description: "Test Desc",
  priority: "high",
  status: "backlog",
};

//  Simple inline test store (NO testStore file)
const createStore = (tasks = []) =>
  configureStore({
    reducer: {
      tasks: tasksReducer,
    },
    preloadedState: {
      tasks: {
        tasks,
        loading: false,
        error: null,
      },
    },
  });

describe("Taskcard Component", () => {
  it("renders task details", () => {
    const store = createStore([mockTask]);

    render(
      <Provider store={store}>
        <Taskcard task={mockTask} index={0} />
      </Provider>,
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Desc")).toBeInTheDocument();
    expect(screen.getByText("high")).toBeInTheDocument();
  });

  it("deletes task when Delete button is clicked", () => {
    const store = createStore([mockTask]);

    render(
      <Provider store={store}>
        <Taskcard task={mockTask} index={0} />
      </Provider>,
    );

    fireEvent.click(screen.getByText("Delete"));

    const state = store.getState().tasks.tasks;
    expect(state.find((t) => t.id === mockTask.id)).toBeUndefined();
  });
});
