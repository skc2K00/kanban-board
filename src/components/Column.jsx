import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Task from "./Task";

const ItemType = "TASK";

const Column = ({ title, tasks, updateTask, deleteTask, moveTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => moveTask(item.id, title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-4 w-full border rounded-lg ${isOver ? "bg-gray-200" : ""}`}
    >
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div className="task-card">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
