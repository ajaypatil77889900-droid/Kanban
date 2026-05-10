export type Priority = "low" | "medium" | "high";

export type Status = "backlog" | "inProgress" | "review" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
};
