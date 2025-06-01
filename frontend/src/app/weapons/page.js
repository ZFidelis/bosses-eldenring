"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const apiUrl = "http://localhost:5243";

export default function WeaponsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-10">
      <div className="bg-zinc-950 border border-zinc-700 shadow-2xl p-10 w-[1200px] max-w-full rounded-2xl transition-all duration-300">
        <h1 className="text-[#bfa046] text-4xl font-extrabold mb-4 drop-shadow-lg">
          Weapons | Elden Ring Wiki
        </h1>
        <hr className="border-zinc-700 mb-6" />
        <WeaponsIntroduction />
        <h2 className="text-[#bfa046] text-2xl font-bold mb-2 drop-shadow">Legendary Weapons</h2>
        <hr className="border-zinc-700 mb-6 w-44" />
        <div className="flex gap-8 flex-col md:flex-row">
          <LegendaryWeapons />
          <WeaponsGuide />
        </div>
        <h2 className="text-[#bfa046] text-2xl font-bold mb-2 mt-10 drop-shadow">Weapons Information</h2>
        <hr className="border-zinc-700 mb-6 w-44" />
        <WeaponsTable />
      </div>
    </div>
  );
}

function WeaponsIntroduction() {
  return (
    <p className="text-zinc-200 text-base mb-8 leading-relaxed">
      Weapons in Elden Ring are pieces of offensive equipment that are used by the player's character to inflict damage against Enemies and Bosses. Elden Ring features 308 Weapons from new categories as well as some returning ones from previous Souls games. Press and hold the interact button (triangle/Y) and the attack button (R1/RB) to two-hand your equipped weapon.
    </p>
  );
}

function LegendaryWeapons() {
  const legendaryWeapons = [
    { id: 111, name: "Devourer's Scepter" },
    { id: 222, name: "Crafted Blade Greatsword" },
    { id: 333, name: "Sword of Night and Flame" },
    { id: 444, name: "Ruins Greatsword" },
    { id: 555, name: "Marais Executioner's Sword" },
    { id: 666, name: "Dark Moon Greatsword" },
    { id: 777, name: "Bolt of Gransax" },
    { id: 888, name: "Eclipse Shotel" },
    { id: 999, name: "Golden Order Greatsword" },
  ];

  return (
    <div className="flex-1">
      <ul className="list-decimal list-inside text-zinc-100 space-y-4 text-lg">
        {legendaryWeapons.map((weapon) => (
          <li key={weapon.id}>
            <Link
              href={`/weapons/${weapon.id}`}
              className="text-[#bfa046] hover:underline font-semibold"
            >
              {weapon.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WeaponsTable() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/weapon`)
      .then((res) => res.json())
      .then((data) => {
        setWeapons(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const uniqueTypes = [...new Set(weapons.map((weapon) => weapon.type))];

  return (
    <div className="flex-1">
      <table className="border border-zinc-700 min-w-[500px] bg-zinc-900/80 text-zinc-100 text-base rounded-xl shadow overflow-hidden">
        <thead>
          <tr>
            <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Type</th>
            <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Weapons</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={2} className="px-4 py-6 h-10 text-center text-zinc-400">
                Loading...
              </td>
            </tr>
          ) : uniqueTypes.length === 0 ? (
            <tr>
              <td colSpan={2} className="px-4 py-6 h-10 text-center text-zinc-400">
                No weapon types found.
              </td>
            </tr>
          ) : (
            uniqueTypes.map((type, i) => (
              <tr key={i} className="hover:bg-zinc-800/60 transition">
                <td className="px-4 py-4 h-10 font-semibold">{type}</td>
                <td className="px-4 py-4 h-10">
                  {weapons
                    .filter((w) => w.type === type)
                    .map((w, idx, arr) => (
                      <span key={w.id}>
                        <Link
                          href={`/weapons/${w.id}`}
                          className="text-[#bfa046] hover:underline font-semibold"
                        >
                          {w.name}
                        </Link>
                        {idx < arr.length - 1 && (
                          <span className="mx-2 text-zinc-400 select-none">•</span>
                        )}
                      </span>
                    ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function WeaponsGuide() {
  return (
    <div className="flex-1">
      <h3 className="text-[#bfa046] text-lg font-bold mb-2">Weapons Guide Video</h3>
      <hr className="border-zinc-700 mb-4 w-64" />
      <div className="w-full aspect-video rounded-xl overflow-hidden flex items-center justify-center bg-zinc-200 shadow">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/msQdm8ZtDIE"
          title="Weapons Guide Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}