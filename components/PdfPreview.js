import jsPDF from "jspdf";

export default function PdfPreview({ form, onEdit }) {
  function generatePDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(form.company, 10, 20);
    doc.setFontSize(14);
    doc.text("To: " + form.client, 10, 35);

    let y = 50;
    doc.setFontSize(12);
    form.items.forEach((item, i) => {
      doc.text(`${item.desc} — ${item.qty} x $${item.price}`, 10, y + i * 10);
    });
    const total = form.items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
    doc.setFontSize(14);
    doc.text("Total: $" + total, 10, y + form.items.length * 10 + 10);

    doc.save("invoice.pdf");
  }

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">Preview</h2>
      <p>
        <b>From:</b> {form.company} <br />
        <b>To:</b> {form.client}
      </p>
      <ul className="my-2">
        {form.items.map((item, i) => (
          <li key={i}>
            {item.desc} — {item.qty} x ${item.price}
          </li>
        ))}
      </ul>
      <p className="mb-4 font-semibold">
        Total: $
        {form.items.reduce((sum, item) => sum + item.qty * item.price, 0)}
      </p>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mr-2"
        onClick={generatePDF}
      >
        Download PDF
      </button>
      <button
        className="text-blue-600 underline"
        onClick={onEdit}
      >
        Edit
      </button>
    </div>
  );
}
const handleCheckout = async () => {
  const res = await fetch("/api/checkout_sessions", {
    method: "POST"
  });
  const data = await res.json();
  window.location.href = data.url;
};

// В компоненте кнопки:
<button
  onClick={handleCheckout}
  className="bg-yellow-500 text-white px-4 py-2 rounded font-bold"
>
  Upgrade to PRO
</button>
