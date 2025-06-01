"use client";

import { useEffect, useState, use } from "react";

export default function BossPage({ params }) {
  const sParams = use(params);
  const { id } = sParams;
  const [boss, setBoss] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5243/boss/${id}`)
      .then(res => res.json())
      .then(data => setBoss(data));
  }, [id]);

  if (!boss) return <div className="text-white">Loading...</div>;

return (
  <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-10">
    <div className="bg-zinc-950 border border-zinc-700 shadow-2xl p-10 w-[1000px] max-w-full rounded-2xl transition-all duration-300">
      <h1 className="text-[#bfa046] text-4xl font-extrabold mb-4 drop-shadow-lg">{boss.name} | Elden Ring Wiki</h1>
      <hr className="border-zinc-700 mb-6" />
      <p className="text-zinc-200 mb-6 text-lg">
        <span className="font-semibold">{boss.name}</span> is {boss.description} Its found in <b className="text-[#bfa046]">{boss.location}</b>
      </p>
      <CombatInfo boss={boss}/>
    </div>
  </div>
);

function CombatInfo({ boss }) {
  const parryableText = boss.parryable ? "Yes" : "Not";

  return (
    <>
      <h2 className="text-[#bfa046] text-2xl font-bold mb-4 rounded px-2 py-1 bg-zinc-900/60 inline-block shadow">Combat Informations</h2>
      <div className="mb-6">
        <h3 className="text-zinc-100 text-lg font-bold mb-2 border-l-4 border-[#bfa046] pl-2">General Info</h3>
        <ul className="bg-zinc-900/60 rounded p-4 list-disc list-inside mb-4">
          <li className="text-zinc-200 mb-2"><b>Health: </b>{boss.health}</li>
          <li className="text-zinc-200 mb-2"><b>Defense: </b>{boss.defense}</li>
          <li className="text-zinc-200 mb-2"><b>Stance: </b>{boss.stance}</li>
          <li className="text-zinc-200 mb-2"><b>Parryable: </b>{parryableText}</li>
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-zinc-100 text-lg font-bold mb-2 border-l-4 border-[#bfa046] pl-2">Damage Types</h3>
        <ul className="bg-zinc-900/60 rounded p-4 list-disc list-inside mb-4">
          {boss.damageType && boss.damageType.map((type, idx) => (
            <li key={idx} className="text-zinc-200 mb-2">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-zinc-100 text-lg font-bold mb-2 border-l-4 border-[#bfa046] pl-2">Inflicted Effects</h3>
        <ul className="bg-zinc-900/60 rounded p-4 list-disc list-inside mb-4">
          {boss.inflicts && boss.inflicts.map((effect, idx) => (
            <li key={idx} className="text-zinc-200 mb-2">
              {effect.charAt(0).toUpperCase() + effect.slice(1)}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-zinc-100 text-lg font-bold mb-2 border-l-4 border-[#bfa046] pl-2">Drops</h3>
        <ul className="bg-zinc-900/60 rounded p-4 list-disc list-inside">
          {boss.drops && boss.drops.map((drop, idx) => (
            <li key={idx} className="text-zinc-200 mb-2">
              {drop.charAt(0).toUpperCase() + drop.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}}