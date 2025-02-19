import React, { useState } from "react";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { CardContent } from "./ui/CardContent";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";

const ItemType = "TASK";

const Task = ({ task, updateTask, deleteTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      className={`p-4 m-2 border rounded-lg shadow-md ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <CardContent className="flex">
        <Input
          value={task.title}
          onChange={(e) => updateTask(task.id, "title", e.target.value)}
          className="text-xl font-semibold mb-2"
        />
        <Textarea
          value={task.description}
          onChange={(e) => updateTask(task.id, "description", e.target.value)}
          placeholder="Task Description"
          className="mb-2"
        />
        <Input
          type="date"
          value={task.dueDate}
          onChange={(e) => updateTask(task.id, "dueDate", e.target.value)}
          className="mb-2"
        />
        <Button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white"
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default Task;
