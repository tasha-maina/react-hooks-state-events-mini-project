import React, { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import NewTaskForm from "./NewTaskForm";
import TaskList from "./TaskList";

import { CATEGORIES, TASKS } from "../data";
console.log("Here's the data you're working with");
console.log({ CATEGORIES, TASKS });

function App() {
  // Add IDs to tasks if they don't have them
  const initialTasksWithId = TASKS.map((task, index) => ({
    id: index + 1, // simple unique id
    ...task,
  }));

  const [tasks, setTasks] = useState(initialTasksWithId);
  const [selectedCategory, setSelectedCategory] = useState("All");

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  const displayedTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter(task => task.category === selectedCategory);

  function handleAddTask(newTask) {
    // Add unique id for new task using timestamp
    const newTaskWithId = { id: Date.now(), ...newTask };
    setTasks([...tasks, newTaskWithId]);
  }

  return (
    <div className="App">
      <h2>My tasks</h2>

      <CategoryFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />

      <NewTaskForm
        categories={CATEGORIES.filter(cat => cat !== "All")}
        onTaskFormSubmit={handleAddTask}
      />

      <TaskList tasks={displayedTasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;
