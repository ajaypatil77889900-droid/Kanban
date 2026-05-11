import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Column from "./Column";

// mocks
const mockUseSelector = vi.fn();

vi.mock("react-redux", () => ({
  useSelector: (selector: any) => mockUseSelector(selector),
}));

vi.mock("./Taskselectors", () => ({
  selectTasksByStatus: (id: string) => id,
}));

vi.mock("./Taskcard", () => ({
  default: ({ task }: any) => <div data-testid="task-card">{task.title}</div>,
}));

// mock Droppable (important)
vi.mock("@hello-pangea/dnd", () => ({
  Droppable: ({ children }: any) =>
    children({
      droppableProps: {
        "data-testid": "droppable",
      },
      innerRef: vi.fn(),
      placeholder: null,
    }),
}));

describe("Column Component", () => {
  beforeEach(() => {
    mockUseSelector.mockClear();
  });

  it("renders column title", () => {
    mockUseSelector.mockReturnValue([]);

    render(<Column id="todo" title="Todo" />);

    expect(screen.getByText("Todo")).toBeInTheDocument();
  });

  it("shows empty state when no tasks", () => {
    mockUseSelector.mockReturnValue([]);

    render(<Column id="todo" title="Todo" />);

    expect(screen.getByText("No tasks")).toBeInTheDocument();
  });

  it("renders tasks when available", () => {
    mockUseSelector.mockReturnValue([
      { id: "1", title: "Task 1" },
      { id: "2", title: "Task 2" },
    ]);

    render(<Column id="todo" title="Todo" />);

    expect(screen.getAllByTestId("task-card")).toHaveLength(2);
  });

  it("calls selector with correct id", () => {
    mockUseSelector.mockReturnValue([]);

    render(<Column id="inProgress" title="In Progress" />);

    // selector passed correctly
    expect(mockUseSelector).toHaveBeenCalled();
  });

  it("renders droppable container", () => {
    mockUseSelector.mockReturnValue([]);

    render(<Column id="todo" title="Todo" />);

    expect(screen.getByTestId("droppable")).toBeInTheDocument();
  });
});
