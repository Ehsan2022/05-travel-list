/** @format */

import { useState } from "react";
import  Logo  from "./Logo";
import  Form  from "./Form";
import  PackingList  from "./PackingList";
import { Stats } from "./Stats";

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


