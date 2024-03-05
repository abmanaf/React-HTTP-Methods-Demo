import React, { useEffect, useState } from "react";
import axios from "axios";
// i am using this url as the endpoint from the backend 'https://api.example.com/products'

function App() {
  const [data, setData] = useState([]);
  const [newproduct, setNewproduct] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.example.com/products");
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const addproduct = async () => {
    try {
      const response = await axios.post("https://api.example.com/products", {
        name: newproduct,
      });
      setData([...data, response.data]);
      setNewproduct("");
    } catch (err) {
      console.error(err);
    }
  };
  const updateproduct = async (id, newproduct) => {
    try {
      const response = await axios.put(
        `https://api.example.com/products/${id}`,
        {
          name: newproduct,
        }
      );
      const updateData = data.map((product) =>
        product.id === id ? { ...product, name: newproduct } : product
      );
      setData(updateData);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteproduct = async (id) => {
    try {
      await axios.delete(`https://api.example.com/products/${id}`);
      const deletedData = data.filter((product) => product.id !== id);
      setData(deletedData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {data.map((product) => (
          <li key={product.id}>
            {product.name}
            <button
              onClick={() =>
                updateproduct(product.id, `${product.name} (Updated)`)
              }
            >
              Update
            </button>
            <button onClick={() => deleteproduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newproduct}
          onChange={(e) => setNewproduct(e.target.value)}
          placeholder="Enter new product name"
        />
        <button onClick={addproduct}>Add product</button>
      </div>{" "}
    </div>
  );
}

export default App;
