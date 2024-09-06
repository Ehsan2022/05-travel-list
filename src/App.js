/** @format */

import { useState } from "react";
import  Logo  from "./Logo";
import  Form  from "./Form";
import  PackingList  from "./PackingList";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handelClearList() {
    const confirmed = window.confirm("Delete all items?");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo></Logo>
      <Form handleAddItem={handleAddItem}></Form>
      <PackingList
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleToggleItem={handleToggleItem}
        handelClearList={handelClearList}></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {numItems === 0
          ? "Start adding some items to your packing list 🚀"
          : percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `You have ${numItems} items on your list, and you already packed ${numPacked} (${
              percentage === 0 ? "0" : percentage
            }%)`}
      </em>
    </footer>
  );
}
