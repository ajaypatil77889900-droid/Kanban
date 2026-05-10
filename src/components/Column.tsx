import { Droppable } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";
import TaskCard from "./Taskcard";
import "../styles/column.css";
import { selectTasksByStatus } from "./Taskselectors";

interface Props {
  id: string;
  title: string;
}

export default function Column({ id, title }: Props) {
  const tasks = useSelector(selectTasksByStatus(id));

  return (
    <div className="column">
      <h3 className="column-title">{title}</h3>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="column-body"
          >
            {tasks.length === 0 && (
              <div className="empty-placeholder">No tasks</div>
            )}

            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
