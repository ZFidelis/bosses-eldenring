"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const apiUrl = "http://localhost:5243";

export default function BossesListPage() {
  const [bosses, setBosses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBosses();
  }, []);

  async function fetchBosses() {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/boss`);
      const data = await res.json();
      setBosses(data);
    } catch {
      setBosses([]);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this boss?")) return;
    await fetch(`${apiUrl}/boss/${id}`, { method: "DELETE" });
    fetchBosses();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-10">
      <div className="bg-zinc-950 border border-zinc-700 shadow-2xl p-10 w-[1200px] max-w-full rounded-2xl transition-all duration-300">
        <h1 className="text-[#bfa046] text-4xl font-extrabold mb-4 drop-shadow-lg">CRUD Bosses | Elden Ring Wiki</h1>
        <hr className="border-zinc-700 mb-6" />
        <div className="flex mb-6">
          <Link
            href="/bosses/edit/create"
            className="bg-[#bfa046] text-zinc-900 px-5 py-2 rounded font-bold hover:bg-[#d6b35c] transition shadow"
          >New Boss
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="border border-zinc-700 min-w-[800px] bg-zinc-900/80 text-zinc-100 text-base rounded-xl shadow overflow-hidden">
            <thead>
              <tr>
                <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Id</th>
                <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Name</th>
                <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Location</th>
                <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Health</th>
                <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Defense</th>
                <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-zinc-400">Loading...</td>
                </tr>
              ) : bosses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-zinc-400">No bosses found.</td>
                </tr>
              ) : (
                bosses.map((boss) => (
                  <tr key={boss.id} className="hover:bg-zinc-800/60 transition">
                    <td className="px-4 py-4">{boss.id}</td>
                    <td className="px-4 py-4">{boss.name}</td>
                    <td className="px-4 py-4">{boss.location}</td>
                    <td className="px-4 py-4">{boss.health}</td>
                    <td className="px-4 py-4">{boss.defense}</td>
                    <td className="px-4 py-4 flex gap-2">
                      <Link
                        href={`/bosses/edit/${boss.id}`}
                        className="bg-[#bfa046] text-zinc-900 px-3 py-1 rounded font-semibold hover:bg-[#d6b35c] transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(boss.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded font-semibold hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}