import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect, vi } from "vitest";
import Column from "./Column";
import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../store/slices/tasksSlice";

vi.mock("@hello-pangea/dnd", () => {
  return {
    Droppable: ({ children }: any) =>
      children({
        innerRef: vi.fn(),
        droppableProps: {},
        placeholder: null,
      }),

    Draggable: ({ children }: any) =>
      children(
        {
          innerRef: vi.fn(),
          draggableProps: {},
          dragHandleProps: {},
        },
        { isDragging: false },
      ),
  };
});

/* 🔹 Helper store */
const renderWithStore = (tasks: any[]) => {
  const store = configureStore({
    reducer: {
      tasks: tasksReducer,
    },
    preloadedState: {
      tasks: { tasks },
    },
  });

  return render(
    <Provider store={store}>
      <Column id="backlog" title="Backlog" />
    </Provider>,
  );
};

describe("Column Component", () => {
  it("renders column title", () => {
    renderWithStore([]);

    expect(screen.getByText("Backlog")).toBeInTheDocument();
  });

  it("shows placeholder when no tasks exist", () => {
    renderWithStore([]);

    expect(screen.getByText("No tasks")).toBeInTheDocument();
  });

  it("renders tasks belonging to the column", () => {
    renderWithStore([
      {
        id: "1",
        title: "Task 1",
        description: "Desc",
        priority: "low",
        status: "backlog",
      },
    ]);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  it("does not render tasks from other columns", () => {
    renderWithStore([
      {
        id: "1",
        title: "Task 1",
        description: "Desc",
        priority: "low",
        status: "done",
      },
    ]);

    expect(screen.queryByText("Task 1")).toBeNull();
    expect(screen.getByText("No tasks")).toBeInTheDocument();
  });
});
