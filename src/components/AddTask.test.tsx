import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import { expect } from "vitest";
import AddTask from "./AddTask";

const mockDispatch = vi.fn();

vi.mock("react-redux", async () => {
  const actual = await vi.importActual<any>("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

describe("AddTask Component", () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders modal when open=true", () => {
    render(<AddTask open={true} onClose={vi.fn()} />);

    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("does not render when open=false", () => {
    render(<AddTask open={false} onClose={vi.fn()} />);

    expect(screen.queryByText("Add Task")).toBeNull();
  });

  it("updates input value", () => {
    render(<AddTask open={true} onClose={vi.fn()} />);

    const input = screen.getByPlaceholderText("Task name") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "New Task" } });

    expect(input.value).toBe("New Task");
  });

  it("dispatches action and closes modal on submit", () => {
    const onClose = vi.fn();

    render(<AddTask open={true} onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText("Task name"), {
      target: { value: "New Task" },
    });

    fireEvent.click(screen.getByText("Add Task"));

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalled();
  });
  it("does not dispatch if task name is empty", () => {
    const onClose = vi.fn();

    render(<AddTask open={true} onClose={onClose} />);

    fireEvent.click(screen.getByText("Add Task"));

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});
