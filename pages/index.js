import { useState } from "react";
import InvoiceForm from "../components/InvoiceForm";
import PdfPreview from "../components/PdfPreview";

export default function Home() {
  const [form, setForm] = useState(null);

  return (
    <main className="flex flex-col items-center px-4 py-8 min-h-screen bg-gray-50">
      <header className="max-w-xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Generate invoices & proposals in 2 minutes</h1>
        <p className="mb-6 text-lg text-gray-700">For freelancers & small business</p>
      </header>
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 mb-6">
        {!form ? (
          <InvoiceForm onSubmit={setForm} />
        ) : (
          <PdfPreview form={form} onEdit={() => setForm(null)} />
        )}
      </section>
      <footer className="text-gray-400 mt-auto text-sm pt-10">
        © {new Date().getFullYear()} QuickDocGen.app
      </footer>
    </main>
  );
}
