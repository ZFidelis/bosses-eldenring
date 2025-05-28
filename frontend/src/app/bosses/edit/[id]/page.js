"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const apiUrl = "http://localhost:5243";

export default function EditBossPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [boss, setBoss] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${apiUrl}/boss/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBoss({
          ...data,
          DamageType: (data.damageType || []).join(", "),
          Inflicts: (data.inflicts || []).join(", "),
          Drops: (data.drops || []).join(", "),
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load boss data.");
        setLoading(false);
      });
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setBoss((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    // Prepare payload
    const payload = {
      id: boss.id,
      name: boss.name,
      description: boss.description,
      location: boss.location,
      health: parseInt(boss.health),
      defense: parseInt(boss.defense),
      stance: parseInt(boss.stance),
      parryable: !!boss.parryable,
      damageType: boss.DamageType.split(",").map((s) => s.trim()).filter(Boolean),
      inflicts: boss.Inflicts.split(",").map((s) => s.trim()).filter(Boolean),
      drops: boss.Drops.split(",").map((s) => s.trim()).filter(Boolean),
      active: !!boss.active,
    };

    const res = await fetch(`${apiUrl}/boss/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/bosses/edit");
    } else {
      setError("Failed to save changes.");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
        <div className="text-zinc-200 text-lg">Loading...</div>
      </div>
    );
  }

  if (!boss) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
        <div className="text-red-400 text-lg">{error || "Boss not found."}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-10">
      <div className="bg-zinc-950 border border-zinc-700 shadow-2xl p-10 w-[900px] max-w-full rounded-2xl transition-all duration-300">
        <h1 className="text-[#bfa046] text-3xl font-extrabold mb-4 drop-shadow-lg">Edit Boss | Elden Ring Wiki</h1>
        <hr className="border-zinc-700 mb-6" />
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" name="name" value={boss.name} onChange={handleChange} required />
          <Input label="Description" name="description" value={boss.description} onChange={handleChange} required />
          <Input label="Location" name="location" value={boss.location} onChange={handleChange} required />
          <div className="flex gap-4">
            <Input label="Health" name="health" type="number" value={boss.health} onChange={handleChange} required />
            <Input label="Defense" name="defense" type="number" value={boss.defense} onChange={handleChange} required />
            <Input label="Stance" name="stance" type="number" value={boss.stance} onChange={handleChange} required />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-zinc-200 font-semibold">Parryable:</label>
            <input
              type="checkbox"
              name="parryable"
              checked={!!boss.parryable}
              onChange={handleChange}
              className="w-5 h-5 accent-[#bfa046]"
            />
          </div>
          <Input
            label="Damage Types (comma separated)"
            name="DamageType"
            value={boss.DamageType}
            onChange={handleChange}
            placeholder="e.g. physical, fire"
          />
          <Input
            label="Inflicts (comma separated)"
            name="Inflicts"
            value={boss.Inflicts}
            onChange={handleChange}
            placeholder="e.g. bleed, poison"
          />
          <Input
            label="Drops (comma separated)"
            name="Drops"
            value={boss.Drops}
            onChange={handleChange}
            placeholder="e.g. rune, sword"
          />
          <div className="flex items-center gap-2">
            <label className="text-zinc-200 font-semibold">Active:</label>
            <input
              type="checkbox"
              name="active"
              checked={!!boss.active}
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
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/bosses/edit")}
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