// pages/index.js
import Form from "./components/Form";
import "../styles/globals.css";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-black text-white">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Form />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
