import React, { useEffect, useState } from "react";
// i am using this url as the endpoint from the backend 'https://api.example.com/items'

function App() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");
  useEffect(() => {
    fetchData();
  });
  const fetchData = async () => {
    try {
      const response = axios.get("https://api.example.com/items");
      setData(response);
    } catch (err) {
      console.error(err);
    }
  };
  const addItem = async () => {
    try {
      const response = axios.post("https://api.example.com/items", newItem);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h2>Items</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name}
            <button
              onClick={() => updateItem(item.id, `${item.name} (Updated)`)}
            >
              Update
            </button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item name"
        />
        <button onClick={addItem}>Add Item</button>
      </div>{" "}
    </div>
  );
}

export default App;
