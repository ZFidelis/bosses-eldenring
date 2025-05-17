"use client";

import { useEffect, useState } from "react";

export default function BossPage({ params }) {
  const { id } = params;
  const [boss, setBoss] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5243/boss/${id}`)
      .then(res => res.json())
      .then(data => setBoss(data));
  }, [id]);

  if (!boss) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-10">
      <div className="bg-zinc-950 border-2 border-white p-10 w-[700px] max-w-full rounded">
        <h1 className="text-white text-3xl font-bold mb-4">{boss.name}</h1>
        <p className="text-white mb-2"><b>Location:</b> {boss.location}</p>
        <p className="text-white mb-2"><b>Description:</b> {boss.description}</p>
      </div>
    </div>
  );
}