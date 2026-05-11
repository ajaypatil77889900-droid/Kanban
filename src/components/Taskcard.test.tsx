import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TaskCard from "./Taskcard";

// mocks
const mockDispatch = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock("../store/slices/tasksSlice", () => ({
  deleteTask: (id: string) => ({ type: "deleteTask", payload: id }),
  markDone: (id: string) => ({ type: "markDone", payload: id }),
}));

vi.mock("./AddTask", () => ({
  default: ({ open }: any) =>
    open ? <div data-testid="edit-modal">Edit Open</div> : null,
}));

// mock Draggable (important)
vi.mock("@hello-pangea/dnd", () => ({
  Draggable: ({ children }: any) =>
    children(
      {
        draggableProps: {
          style: {},
        },
        dragHandleProps: {},
        innerRef: vi.fn(),
      },
      {
        isDragging: false,
      },
    ),
}));

const task = {
  id: "1",
  title: "Test Task",
  description: "Test Desc",
  priority: "high",
  status: "todo",
};

describe("TaskCard Component", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders task content", () => {
    render(<TaskCard task={task} index={0} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Desc")).toBeInTheDocument();
    expect(screen.getByText("high")).toBeInTheDocument();
  });

  it("dispatches markDone when Done button clicked", () => {
    render(<TaskCard task={task} index={0} />);

    fireEvent.click(screen.getByText("Done"));

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("dispatches deleteTask when Delete clicked", () => {
    render(<TaskCard task={task} index={0} />);

    fireEvent.click(screen.getByText("Delete"));

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("opens edit modal when edit button clicked", () => {
    render(<TaskCard task={task} index={0} />);

    fireEvent.click(screen.getByText("✏️"));

    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
  });

  it("does not show Done button if task is done", () => {
    render(<TaskCard task={{ ...task, status: "done" }} index={0} />);

    expect(screen.queryByText("Done")).not.toBeInTheDocument();
  });
});
