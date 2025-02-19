import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

const LOCAL_STORAGE_KEY = "kanban_tasks";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || []);
    // if (storedTasks) {
    //   setTasks(storedTasks);
    // }
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    if(tasks.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "To Do",
  });

  const addTask = () => {
    if (newTask.title.trim() !== "") {
      const newTaskData = { ...newTask, id: Date.now() };
      setTasks([...tasks, newTaskData]);
      setNewTask({ title: "", description: "", dueDate: "", status: "To Do" }); // Reset the input form
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id, field, value) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, [field]: value } : task))
    );
  };

  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 max-w-4xl mx-auto">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Add New Task</h2>
          <div className="space-y-2">
            <Input
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder="Task Title"
              className="text-xl font-semibold"
            />
            <Input
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              type="date"
              className="mb-2"
            />
            <textarea
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Task Description"
              className="w-full p-2 border rounded mb-2"
            />
            <select
              value={newTask.status}
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <Button onClick={addTask} className="bg-blue-500 text-white">
              Add Task
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {["To Do", "In Progress", "Done"].map((status) => (
            <Column
              key={status}
              title={status}
              tasks={tasks.filter((task) => task.status === status)}
              updateTask={updateTask}
              deleteTask={deleteTask}
              moveTask={moveTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
