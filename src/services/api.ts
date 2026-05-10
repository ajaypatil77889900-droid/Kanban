import type { ApiTask } from "../types/api.type";

export async function fetchTasksFromApi() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10",
  );

  if (!res.ok) throw new Error("API failed");

  const data: ApiTask[] = await res.json();

  return data.map((task) => ({
    id: String(task.id),
    title: task.title,
    description: "Fetched from API",
    priority: "medium" as const,
    status: task.completed ? "done" : "backlog",
  }));
}
