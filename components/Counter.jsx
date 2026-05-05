"use client";

export default function Counter() {
  const start = new Date("2025-12-18");
  const now = new Date();
  const diff = now - start;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return (
    <div className="mt-12 text-center">
      <p className="text-gray-600 text-lg">Estamos juntos há</p>

      <p className="text-4xl sm:text-5xl font-bold text-pink-500 mt-2">{days}</p>

      <p className="text-gray-500 font-bold mt-1 text-3xl">dias ❤️</p>
    </div>
  );
}