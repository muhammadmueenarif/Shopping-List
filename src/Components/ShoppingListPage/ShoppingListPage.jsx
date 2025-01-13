import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import LoggedInNavbar from "../Navbar/LoggedInNavbar";

const ShoppingListPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");
  
  const handleAddItem = () => {
    if (newItem.trim() && category.trim()) {
      setItems([
        ...items,
        { name: newItem, category, completed: false, id: Date.now() },
      ]);
      setNewItem("");
      setCategory("");
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleToggleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    
   <div>
    <div>
          <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>

      {/* Add New Item */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Item name"
          className="border rounded px-2 py-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-2 py-1 hover:cursor-pointer"
        >
          <option value="">Category</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Household">Household</option>
        </select>
        <button
          onClick={handleAddItem}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          + Add
        </button>
      </div>

      {/* Search Filter */}
      <div className="mb-6">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search items..."
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      {/* Items List */}
      <ul className="w-full max-w-md">
        {filteredItems.map((item) => (
          <li
            key={item.id}
            className={`flex justify-between items-center p-2 border-b ${
              item.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <span>{item.name} ({item.category})</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleToggleComplete(item.id)}
                className="text-green-600"
              >
                {item.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <Footer/>
    </div>
   </div>

  );
};

export default ShoppingListPage;
