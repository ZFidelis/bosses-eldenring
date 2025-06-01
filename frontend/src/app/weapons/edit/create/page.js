"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const apiUrl = "http://localhost:5243";

export default function CreateWeaponPage() {
  const router = useRouter();
  const [weapon, setWeapon] = useState({
    name: "",
    description: "",
    type: "",
    attack: "",
    guard: "",
    scalling: "",
    requires: "",
    damageType: "",
    skill: "",
    fpCost: "",
    weight: "",
    inflicts: "",
    active: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setWeapon((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: weapon.name,
      description: weapon.description,
      type: weapon.type,
      attack: weapon.attack.split(",").map((s) => s.trim()).filter(Boolean),
      guard: weapon.guard.split(",").map((s) => s.trim()).filter(Boolean),
      scalling: weapon.scalling.split(",").map((s) => s.trim()).filter(Boolean),
      requires: weapon.requires.split(",").map((s) => s.trim()).filter(Boolean),
      damageType: weapon.damageType.split(",").map((s) => s.trim()).filter(Boolean),
      skill: weapon.skill,
      fpCost: weapon.fpCost,
      weight: parseFloat(weapon.weight),
      inflicts: weapon.inflicts.split(",").map((s) => s.trim()).filter(Boolean),
      active: !!weapon.active,
    };

    const res = await fetch(`${apiUrl}/weapon`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/weapons/edit");
    } else {
      setError("Failed to create weapon.");
    }
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-10">
      <div className="bg-zinc-950 border border-zinc-700 shadow-2xl p-10 w-[900px] max-w-full rounded-2xl transition-all duration-300">
        <h1 className="text-[#bfa046] text-3xl font-extrabold mb-4 drop-shadow-lg">Create Weapon</h1>
        <hr className="border-zinc-700 mb-6" />
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" name="name" value={weapon.name} onChange={handleChange} required />
          <Input label="Description" name="description" value={weapon.description} onChange={handleChange} required />
          <Input label="Type" name="type" value={weapon.type} onChange={handleChange} required />
          <div className="flex gap-4">
            <Input label="Attack (comma separated)" name="attack" value={weapon.attack} onChange={handleChange} placeholder='e.g. 120 Physical, 50 Magic' />
            <Input label="Guard (comma separated)" name="guard" value={weapon.guard} onChange={handleChange} placeholder='e.g. 60, 40' />
          </div>
          <div className="flex gap-4">
            <Input label="Scalling (comma separated)" name="scalling" value={weapon.scalling} onChange={handleChange} placeholder='e.g. D, C, B' />
            <Input label="Requires (comma separated)" name="requires" value={weapon.requires} onChange={handleChange} placeholder='e.g. Str 24, Dex 18' />
          </div>
          <Input label="Damage Types (comma separated)" name="damageType" value={weapon.damageType} onChange={handleChange} placeholder="e.g. physical, fire" />
          <Input label="Skill" name="skill" value={weapon.skill} onChange={handleChange} required />
          <div className="flex gap-4">
            <Input label="FP Cost" name="fpCost" value={weapon.fpCost} onChange={handleChange} />
            <Input label="Weight" name="weight" type="number" value={weapon.weight} onChange={handleChange} required />
          </div>
          <Input label="Inflicts (comma separated)" name="inflicts" value={weapon.inflicts} onChange={handleChange} placeholder="e.g. bleed, frost" />
          <div className="flex items-center gap-2">
            <label className="text-zinc-200 font-semibold">Active:</label>
            <input
              type="checkbox"
              name="active"
              checked={!!weapon.active}
              onChange={handleChange}
              className="w-5 h-5 accent-[#bfa046]"
            />
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#bfa046] text-zinc-900 px-6 py-2 rounded font-bold hover:bg-[#d6b35c] transition"
            >
              {saving ? "Saving..." : "Create"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/weapons/edit")}
              className="bg-zinc-700 text-zinc-200 px-6 py-2 rounded font-bold hover:bg-zinc-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", ...props }) {
  return (
    <div className="flex flex-col mb-2 flex-1">
      <label className="text-zinc-200 font-semibold mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:outline-none focus:border-[#bfa046] transition"
        {...props}
      />
    </div>
  );
}