import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick, onCompleteClick }) => {
  const active = todoItems.filter((item) => !item.completed);
  const completed = todoItems.filter((item) => item.completed);

  return (
    <div className="flex flex-col gap-3">
      {active.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          todoDate={item.dueDate}
          todoName={item.name}
          completed={item.completed}
          onDeleteClick={onDeleteClick}
          onCompleteClick={onCompleteClick}
        />
      ))}

      {completed.length > 0 && (
        <>
          <div className="flex items-center gap-3 mt-4 mb-1">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Completed ({completed.length})
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          {completed.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              todoDate={item.dueDate}
              todoName={item.name}
              completed={item.completed}
              onDeleteClick={onDeleteClick}
              onCompleteClick={onCompleteClick}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default TodoItems;
