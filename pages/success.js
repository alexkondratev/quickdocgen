export default function Success() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-2">Payment Successful 🎉</h1>
      <p className="mb-4">Thanks for purchasing PRO! You now have access to all features.</p>
      <a href="/" className="text-blue-600 underline">Go back to site</a>
    </div>
  );
}
// success.js
useEffect(() => {
  localStorage.setItem("quickdocgen_pro", "1");
}, []);
