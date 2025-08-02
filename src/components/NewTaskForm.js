import React, { useState } from "react";

function NewTaskForm({ categories, onTaskFormSubmit }) {
  // Controlled form state
  const [text, setText] = useState("");
  const [category, setCategory] = useState(categories[0] || "");

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Create new task object
    const newTask = {
      id: Date.now(), // simple unique id
      text,
      category,
    };

    // Call the parent's callback with new task
    onTaskFormSubmit(newTask);

    // Reset form inputs
    setText("");
    setCategory(categories[0] || "");
  }

  return (
    <form className="new-task-form" onSubmit={handleSubmit}>
      <label>
        Details
        <input
          type="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </label>
      <label>
        Category
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
      <input type="submit" value="Add task" />
    </form>
  );
}

export default NewTaskForm;
