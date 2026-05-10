import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./store/slices/tasksSlice";
import type { RootState, AppDispatch } from "./store/store";
import Board from "./pages/Board";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, tasks } = useSelector((s: RootState) => s.tasks);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(fetchTasks());
    }
  }, [dispatch, tasks.length]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <Board />;
}
