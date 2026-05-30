import { useState } from "react";

export default function Dashboard() {
  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    itemName: "",
    category: "",
    quantity: "",
    unit: "",
    minimumStock: "",
    expiryDate: "",
  });

  const addItem = (e) => {
    e.preventDefault();

    const newItem = {
      _id: Date.now(),
      ...form,
    };

    setItems([...items, newItem]);

    setForm({
      itemName: "",
      category: "",
      quantity: "",
      unit: "",
      minimumStock: "",
      expiryDate: "",
    });
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item._id !== id));
  };

  const lowStockItems = items.filter(
    (item) =>
      Number(item.quantity) <= Number(item.minimumStock)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold text-indigo-700">
            Smart Grocery Manager
          </h1>

          <p className="text-gray-600 mt-2">
            Inventory Management Dashboard
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
          <h3>Total Items</h3>
          <p className="text-4xl font-bold">{items.length}</p>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg">
          <h3>Low Stock</h3>
          <p className="text-4xl font-bold">
            {lowStockItems.length}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
          <h3>Status</h3>
          <p className="text-4xl font-bold">✓</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white p-6 rounded-2xl shadow-lg">
          <h3>Categories</h3>
          <p className="text-4xl font-bold">
            {new Set(items.map((i) => i.category)).size}
          </p>
        </div>
      </div>

      <form
        onSubmit={addItem}
        className="bg-white p-8 rounded-3xl shadow-xl mb-8 grid md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Item Name"
          className="border p-3 rounded-xl"
          value={form.itemName}
          onChange={(e) =>
            setForm({ ...form, itemName: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-3 rounded-xl"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Quantity"
          className="border p-3 rounded-xl"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Unit"
          className="border p-3 rounded-xl"
          value={form.unit}
          onChange={(e) =>
            setForm({ ...form, unit: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Minimum Stock"
          className="border p-3 rounded-xl"
          value={form.minimumStock}
          onChange={(e) =>
            setForm({
              ...form,
              minimumStock: e.target.value,
            })
          }
        />

        <input
          type="date"
          className="border p-3 rounded-xl"
          value={form.expiryDate}
          onChange={(e) =>
            setForm({
              ...form,
              expiryDate: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl md:col-span-2"
        >
          Add Grocery Item
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg p-5"
          >
            <h2 className="text-2xl font-bold text-indigo-700">
              {item.itemName}
            </h2>

            <p className="mt-2">
              Category: {item.category}
            </p>

            <p>
              Quantity: {item.quantity} {item.unit}
            </p>

            <p>
              Minimum Stock: {item.minimumStock}
            </p>

            {item.expiryDate && (
              <p>Expiry: {item.expiryDate}</p>
            )}

            {Number(item.quantity) <=
              Number(item.minimumStock) && (
              <p className="text-red-500 font-bold mt-2">
                Low Stock Alert
              </p>
            )}

            <button
              onClick={() => deleteItem(item._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}