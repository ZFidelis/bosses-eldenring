"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const apiUrl = "http://localhost:5243";

export default function WeaponsListPage() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("id"); 

  useEffect(() => {
    fetchWeapons();
  }, []);

  async function fetchWeapons() {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/weapon`);
      const data = await res.json();
      setWeapons(data);
    } catch {
      setWeapons([]);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this weapon?")) return;
    await fetch(`${apiUrl}/weapon/${id}`, { method: "DELETE" });
    fetchWeapons();
  }

  const sortedWeapons = [...weapons].sort((a, b) => {
    if (sortBy === "id") return a.id - b.id;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "type") return a.type.localeCompare(b.type);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-10">
      <div className="bg-zinc-950 border border-zinc-700 shadow-2xl p-10 w-[1200px] max-w-full rounded-2xl transition-all duration-300">
        <h1 className="text-[#bfa046] text-4xl font-extrabold mb-4 drop-shadow-lg">CRUD Weapons | Elden Ring Wiki</h1>
        <hr className="border-zinc-700 mb-6" />
        <div className="flex mb-6 items-center gap-4">
          <Link
            href="/weapons/edit/create"
            className="bg-[#bfa046] text-zinc-900 px-5 py-2 rounded font-bold hover:bg-[#d6b35c] transition shadow"
          >
            New Weapon
          </Link>
          <label className="text-zinc-200 font-semibold ml-4">
            Sort by:{" "}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-zinc-100 ml-2"
            >
              <option value="id">ID</option>
              <option value="name">Name (A-Z)</option>
              <option value="type">Type (A-Z)</option>
            </select>
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="border border-zinc-700 min-w-[800px] bg-zinc-900/80 text-zinc-100 text-base rounded-xl shadow overflow-hidden">
            <thead>
              <tr>
                <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Id</th>
                <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Name</th>
                <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Type</th>
                <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Skill</th>
                <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Weight</th>
                <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-zinc-400">Loading...</td>
                </tr>
              ) : sortedWeapons.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-zinc-400">No weapons found.</td>
                </tr>
              ) : (
                sortedWeapons.map((weapon) => (
                  <tr key={weapon.id} className="hover:bg-zinc-800/60 transition">
                    <td className="px-4 py-4">{weapon.id}</td>
                    <td className="px-4 py-4">{weapon.name}</td>
                    <td className="px-4 py-4">{weapon.type}</td>
                    <td className="px-4 py-4">{weapon.skill}</td>
                    <td className="px-4 py-4">{weapon.weight}</td>
                    <td className="px-4 py-4 flex gap-2">
                      <Link
                        href={`/weapons/edit/${weapon.id}`}
                        className="bg-[#bfa046] text-zinc-900 px-3 py-1 rounded font-semibold hover:bg-[#d6b35c] transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(weapon.id)}
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