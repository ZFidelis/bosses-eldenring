"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Importar o hook useParams

const apiUrl = "http://localhost:5243";

export default function WeaponsByTypePage() {
  const { type } = useParams(); // Obter o parâmetro "type" da URL
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/weapon/type/${type}`)
      .then((res) => res.json())
      .then((data) => {
        setWeapons(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [type]);

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-10">
      <div className="bg-zinc-950 border-2 border-white p-10 w-[900px] max-w-full rounded">
        <h1 className="text-white text-3xl font-bold mb-6">
          Weapons of type: {type.replace(/-/g, " ")}
        </h1>
        <hr className="border-white mb-8" />
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : weapons.length === 0 ? (
          <p className="text-white text-center">No weapons found for this type.</p>
        ) : (
          <ul className="list-disc list-inside text-white space-y-4 text-xl">
            {weapons.map((weapon, i) => (
              <li key={i}>
                <a
                  href={`/weapons/${weapon.type}`}
                  className="text-blue-400 hover:underline"
                >
                  {weapon.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}