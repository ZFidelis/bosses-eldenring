"use client";

import { useEffect, useState, use } from "react";

export default function WeaponPage({ params }) {
  const sParams = use(params);
  const { id } = sParams;
  const [weapon, setWeapon] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5243/weapon/${id}`)
      .then((res) => res.json())
      .then((data) => setWeapon(data));
  }, [id]);

  if (!weapon) return <div className="text-white">Loading...</div>;

  const weaponTitle = weapon.name + (weapon.type ? ` (${weapon.type})` : "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-10">
      <div className="bg-zinc-950 border border-zinc-700 shadow-2xl p-10 w-[1000px] max-w-full rounded-2xl transition-all duration-300">
        <h1 className="text-[#bfa046] text-4xl font-extrabold mb-4 drop-shadow-lg">
          {weaponTitle} | Elden Ring
        </h1>
        <hr className="border-zinc-700 mb-6" />
        <p className="text-zinc-200 mb-6 text-lg">
          {weapon.description && (
              <b className="text-[semi-bold]">{weapon.description}</b>
          )}
        </p>
        <WeaponInfo weapon={weapon} />
      </div>
    </div>
  );
}

function WeaponInfo({ weapon }) {
  return (
    <>
      <h2 className="text-[#bfa046] text-2xl font-bold mb-4 rounded px-2 py-1 bg-zinc-900/60 inline-block shadow">
        Weapon Informations
      </h2>
      <div className="mb-6">
        <h3 className="text-zinc-100 text-lg font-bold mb-2 border-l-4 border-[#bfa046] pl-2">
          General Info
        </h3>
        <ul className="bg-zinc-900/60 rounded p-4 list-disc list-inside mb-4">
          <li className="text-zinc-200 mb-2">
            <b>Type: </b>
            {weapon.type}
          </li>
          <li className="text-zinc-200 mb-2">
            <b>Skill: </b>
            {weapon.skill}
          </li>
          <li className="text-zinc-200 mb-2">
            <b>FP Cost: </b>
            {weapon.fpCost}
          </li>
          <li className="text-zinc-200 mb-2">
            <b>Weight: </b>
            {weapon.weight}
          </li>
          <li className="text-zinc-200 mb-2">
            <b>Active: </b>
            {weapon.active ? "Yes" : "No"}
          </li>
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-zinc-100 text-lg font-bold mb-2 border-l-4 border-[#bfa046] pl-2">
          Attack
        </h3>
        <ul className="bg-zinc-900/60 rounded p-4 list-disc list-inside mb-4">
          {weapon.attack &&
            weapon.attack.map((atk, idx) => (
              <li key={idx} className="text-zinc-200 mb-2">
                {atk}
              </li>
            ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-zinc-100 text-lg font-bold mb-2 border-l-4 border-[#bfa046] pl-2">
          Guard
        </h3>
        <ul className="bg-zinc-900/60 rounded p-4 list-disc list-inside mb-4">
          {weapon.guard &&
            weapon.guard.map((g, idx) => (
              <li key={idx} className="text-zinc-200 mb-2">
                {g}
              </li>
            ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-zinc-100 text-lg font-bold mb-2 border-l-4 border-[#bfa046] pl-2">
          Scaling
        </h3>
        <ul className="bg-zinc-900/60 rounded p-4 list-disc list-inside mb-4">
          {weapon.scalling &&
            weapon.scalling.map((s, idx) => (
              <li key={idx} className="text-zinc-200 mb-2">
                {s}
              </li>
            ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-zinc-100 text-lg font-bold mb-2 border-l-4 border-[#bfa046] pl-2">
          Requirements
        </h3>
        <ul className="bg-zinc-900/60 rounded p-4 list-disc list-inside mb-4">
          {weapon.requires &&
            weapon.requires.map((r, idx) => (
              <li key={idx} className="text-zinc-200 mb-2">
                {r}
              </li>
            ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-zinc-100 text-lg font-bold mb-2 border-l-4 border-[#bfa046] pl-2">
          Damage Types
        </h3>
        <ul className="bg-zinc-900/60 rounded p-4 list-disc list-inside mb-4">
          {weapon.damageType &&
            weapon.damageType.map((type, idx) => (
              <li key={idx} className="text-zinc-200 mb-2">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </li>
            ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-zinc-100 text-lg font-bold mb-2 border-l-4 border-[#bfa046] pl-2">
          Inflicted Effects
        </h3>
        <ul className="bg-zinc-900/60 rounded p-4 list-disc list-inside mb-4">
          {weapon.inflicts &&
            weapon.inflicts.map((effect, idx) => (
              <li key={idx} className="text-zinc-200 mb-2">
                {effect.charAt(0).toUpperCase() + effect.slice(1)}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
