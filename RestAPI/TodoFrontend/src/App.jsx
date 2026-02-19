import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useState, useEffect } from "react";
import { addItemToServer, getItemsFromServer, deleteItemFromServer, markItemCompletedOnServer } from "./services/ItemsService";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  useEffect(()=>{
    const loadInitialItems = async() => {
      const itemsFromServer = await getItemsFromServer();
      setTodoItems(itemsFromServer);
    }
    loadInitialItems();
  },[]);

  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const item = await addItemToServer(itemName, itemDueDate);
    const newTodoItems = [
      ...todoItems,
      item,
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    await deleteItemFromServer(id);
    setTodoItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCompleteItem = async (id) => {
    const updatedItem = await markItemCompletedOnServer(id);
    setTodoItems((prev) =>
      prev.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <AppName />
        <AddTodo onNewItem={handleNewItem} />
        {todoItems.length === 0 && <WelcomeMessage />}
        <TodoItems todoItems={todoItems} onDeleteClick={handleDeleteItem} onCompleteClick={handleCompleteItem} />
      </div>
    </div>
  );
}

export default App;
