/** @format */

import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  handleDeleteItem,
  handleToggleItem,
  handelClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleDeleteItem={handleDeleteItem}
            handleToggleItem={handleToggleItem}></Item>
        ))}
      </ul>
      <div className="actions">
        <p>Order by</p>
        <select style={{width:"135px",padding:"7px 0"}} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input"> input order</option>
          <option value="description">description</option>
          <option value="packed"> packed status</option>
        </select>
        <button
          style={{ backgroundColor: "white", color: "black" }}
          onClick={handelClearList}>
          Clear List
        </button>
      </div>
    </div>
  );
}
