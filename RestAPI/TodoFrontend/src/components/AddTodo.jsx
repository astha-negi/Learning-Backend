import { useState } from "react";

function AddTodo({ onNewItem }) {
  const [todoName, setTodoName] = useState();
  const [dueDate, setDueDate] = useState();

  const handleNameChange = (event) => {
    setTodoName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddButtonClicked = () => {
    onNewItem(todoName, dueDate);
    setDueDate("");
    setTodoName("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-indigo-50">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={todoName || ""}
          onChange={handleNameChange}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
        <input
          type="date"
          value={dueDate || ""}
          onChange={handleDateChange}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
        <button
          type="button"
          onClick={handleAddButtonClicked}
          className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl px-6 py-2.5 text-sm font-semibold transition-all shadow-sm"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
