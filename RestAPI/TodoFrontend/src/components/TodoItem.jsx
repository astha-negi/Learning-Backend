function TodoItem({ id, todoName, todoDate, completed, onDeleteClick, onCompleteClick }) {
  const formattedDate = todoDate
    ? new Date(todoDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div
      className={`flex items-center gap-4 rounded-xl shadow-sm border px-5 py-4 transition-all ${
        completed
          ? "bg-gray-50 border-gray-100 opacity-70"
          : "bg-white border-gray-100 hover:shadow-md hover:border-indigo-100"
      }`}
    >
      {/* Complete toggle */}
      <button
        type="button"
        onClick={() => onCompleteClick(id)}
        title={completed ? "Completed" : "Mark as complete"}
        className={`w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
          completed
            ? "bg-green-500 border-green-500 text-white"
            : "border-gray-300 hover:border-indigo-400"
        }`}
      >
        {completed && (
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Task name */}
      <div
        className={`flex-1 text-sm font-medium ${
          completed ? "text-gray-400 line-through" : "text-gray-800"
        }`}
      >
        {todoName}
      </div>

      {/* Due date */}
      {formattedDate && (
        <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full whitespace-nowrap">
          📅 {formattedDate}
        </span>
      )}

      {/* Delete */}
      <button
        type="button"
        onClick={() => onDeleteClick(id)}
        className="text-red-400 hover:text-white hover:bg-red-500 border border-red-200 hover:border-red-500 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
