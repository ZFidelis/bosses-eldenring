"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const apiUrl = "http://localhost:5243";

export default function WeaponsPage() {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-16">
      <div className="bg-zinc-950 border-2 border-white p-16 w-[1400px] max-w-full rounded">
        <h1 className="text-white text-6xl font-bold mb-8">Weapons Elden Ring</h1>
        <hr className="border-white mb-10" />
        <WeaponsIntroduction />
        <div className="flex gap-16 mb-16">
          <LegendaryWeapons />
          <WeaponsGuide />
        </div>
        <WeaponsTable />
      </div>
    </div>
  );
}

function WeaponsIntroduction() {
  return (
    <p className="text-white text-xl mb-12 leading-relaxed">
      Weapons in Elden Ring are pieces of offensive equipment that are used by the player's character to inflict damage against Enemies and Bosses. Elden Ring features 308 Weapons from new categories as well as some returning ones from previous Souls games. Press and hold the interact button (triangle/Y) and the attack button (R1/RB) to two-hand your equipped weapon.
    </p>
  );
}

function LegendaryWeapons() {
  const legendaryWeapons = [
    "Devourer's Scepter",
    "Crafted Blade Greatsword",
    "Sword of Night and Flame",
    "Ruins Greatsword",
    "Marais Executioner's Sword",
    "Dark Moon Greatsword",
    "Bolt of Gransax",
    "Eclipse Shotel",
    "Golden Order Greatsword",
  ];

  return (
    <div className="flex-1">
      <h2 className="text-white text-3xl font-bold mb-6">All Legendary Weapons</h2>
      <hr className="border-white mb-8 w-64" />
      <ul className="list-decimal list-inside text-white space-y-4 text-xl">
        {legendaryWeapons.map((weapon, index) => (
          <li key={index}>
            <Link
              href={`/weapons/${weapon.toLowerCase().replace(/ /g, "-")}`}
              className="text-blue-400 hover:underline"
            >
              {weapon}
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

  // Filtrar tipos únicos
  const uniqueTypes = [...new Set(weapons.map((weapon) => weapon.type))];

  return (
    <div>
      <h3 className="text-white text-3xl font-bold mb-6">Weapon Types</h3>
      <hr className="border-white mb-8 w-64" />
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : uniqueTypes.length === 0 ? (
        <p className="text-white text-center">No weapon types found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {uniqueTypes.map((type, i) => (
            <div
              key={i}
              className="bg-zinc-800 text-white text-center py-4 px-2 rounded shadow-md"
            >
              <Link
                href={`/weapons/${type.toLowerCase().replace(/ /g, "-")}`}
                className="text-gray-400 hover:underline"
              >
                {type}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WeaponsGuide() {
  return (
    <div className="flex-1">
      <h3 className="text-white text-3xl font-bold mb-6">Weapons Guide</h3>
      <hr className="border-white mb-8 w-64" />
      <div className="w-full aspect-video rounded overflow-hidden flex items-center justify-center bg-zinc-200">
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