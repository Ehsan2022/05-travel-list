import { useState } from "react";

export default function App() {
  const [items,setItems] = useState([]);

  function handleAddItem(item) {
    setItems(items=>[...items, item]);
  }
  function handleDeleteItem(id){
    setItems((items)=>items.filter((item)=>item.id !== id));
  }
  function handleToggleItem(id){
    setItems(items.map(item=> item.id === id ? {...item , packed:!item.packed} : item))
  }
   
  return (
    <div className="app">
      <Logo></Logo>
      <Form handleAddItem={handleAddItem}></Form>
      <PackingList items={items} handleDeleteItem={handleDeleteItem} handleToggleItem={handleToggleItem}></PackingList>
      <Stats></Stats>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼 </h1>;
}
function Form({handleAddItem}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      description: description,
      quantity: quantity,
      id: Date.now(),
      packed: false,
    };
    handleAddItem(newItem);
    setDescription(""); 
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What dou you need for your ♥ trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="item..."
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({items ,handleDeleteItem , handleToggleItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} handleDeleteItem={handleDeleteItem} handleToggleItem={handleToggleItem}></Item>
        ))}
      </ul>
    </div>
  );
}
function Item({ item ,handleDeleteItem ,handleToggleItem}) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={()=>handleToggleItem(item.id)}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={()=>handleDeleteItem(item.id)}>
        <span>X</span>
      </button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You hav X items on your list, and you already packed X (X%)sfdasg</em>
    </footer>
  );
}

