import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AddTask from "./AddTask";
import "@testing-library/jest-dom/vitest";

const mockDispatch = vi.fn();
const mockOnClose = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock("../store/slices/tasksSlice", () => ({
  addTask: (payload: any) => ({ type: "addTask", payload }),
  updateTask: (payload: any) => ({ type: "updateTask", payload }),
}));

const baseTask = {
  id: "1",
  title: "Old Task",
  description: "Old Desc",
  priority: "low",
  status: "backlog",
};

describe("AddTask Component", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockOnClose.mockClear();
  });

  it("renders create mode correctly", () => {
    render(<AddTask open={true} onClose={mockOnClose} />);

    expect(screen.getByPlaceholderText("Task name")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    const { container } = render(
      <AddTask open={false} onClose={mockOnClose} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("updates input fields", () => {
    render(<AddTask open={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText("Task name"), {
      target: { value: "New Task" },
    });

    expect(screen.getByDisplayValue("New Task")).toBeInTheDocument();
  });

  it("pre-fills form in edit mode", () => {
    render(
      <AddTask open={true} onClose={mockOnClose} editTask={baseTask as any} />,
    );

    expect(screen.getByDisplayValue("Old Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Old Desc")).toBeInTheDocument();
  });

  it("dispatches addTask on create submit", () => {
    render(<AddTask open={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText("Task name"), {
      target: { value: "Task 1" },
    });

    fireEvent.click(screen.getByText("Add Task"));

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("dispatches updateTask on edit submit", () => {
    render(
      <AddTask open={true} onClose={mockOnClose} editTask={baseTask as any} />,
    );

    fireEvent.change(screen.getByPlaceholderText("Task name"), {
      target: { value: "Updated Task" },
    });

    fireEvent.click(screen.getByText("Update Task"));

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("does not submit when title is empty", () => {
    render(<AddTask open={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Add Task"));

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
