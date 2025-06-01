import { useState } from "react";

export default function InvoiceForm({ onSubmit }) {
  const [form, setForm] = useState({
    company: "",
    client: "",
    items: [{ desc: "", qty: 1, price: 0 }]
  });

  function handleItemChange(i, field, value) {
    setForm(f => {
      const items = [...f.items];
      items[i][field] = value;
      return { ...f, items };
    });
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={e => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <input
        placeholder="Your company name"
        className="border p-2 rounded"
        value={form.company}
        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
        required
      />
      <input
        placeholder="Client name"
        className="border p-2 rounded"
        value={form.client}
        onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
        required
      />
      <div>
        <label className="font-semibold mb-1">Items/services:</label>
        {form.items.map((item, i) => (
          <div className="flex gap-2 mb-2" key={i}>
            <input
              placeholder="Description"
              className="border p-2 rounded w-2/4"
              value={item.desc}
              onChange={e => handleItemChange(i, "desc", e.target.value)}
              required
            />
            <input
              placeholder="Qty"
              type="number"
              min="1"
              className="border p-2 rounded w-1/6"
              value={item.qty}
              onChange={e => handleItemChange(i, "qty", e.target.value)}
              required
            />
            <input
              placeholder="Price"
              type="number"
              min="0"
              className="border p-2 rounded w-1/4"
              value={item.price}
              onChange={e => handleItemChange(i, "price", e.target.value)}
              required
            />
            {form.items.length > 1 && (
              <button type="button" className="text-red-400" onClick={() => setForm(f => ({
                ...f,
                items: f.items.filter((_, j) => j !== i)
              }))}>✕</button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="text-blue-500"
          onClick={() =>
            setForm(f => ({
              ...f,
              items: [...f.items, { desc: "", qty: 1, price: 0 }]
            }))
          }
        >
          + Add item
        </button>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
      >
        Generate PDF
      </button>
    </form>
  );
}
