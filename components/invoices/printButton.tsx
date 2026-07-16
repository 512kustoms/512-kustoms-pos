"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 print:hidden"
    >
      🖨 Print Invoice
    </button>
  );
}