"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

var apiUrl = "http://localhost:5243";

export default function Bosses() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 flex items-center justify-center p-10">
      <div className="bg-zinc-950 border border-zinc-700 shadow-2xl p-10 w-[1200px] max-w-full rounded-2xl transition-all duration-300">
        <h1 className="text-[#bfa046] text-4xl font-extrabold mb-4 drop-shadow-lg">Bosses | Elden Ring Wiki</h1>
        <hr className="border-zinc-700 mb-6" />
        <BossesIntroduction />
        <h2 className="text-[#bfa046] text-2xl font-bold mb-2 drop-shadow">Bosses Information</h2>
        <hr className="border-zinc-700 mb-6 w-44" />
        <div className="flex gap-8 flex-col md:flex-row">
          <BossesTable />
          <BossesVideo />
        </div>
      </div>
    </div>
  );
}

function BossesIntroduction() {
  return (
    <>
      <p className="text-zinc-200 text-base mb-8 leading-relaxed">
        Bosses in Elden Ring are powerful enemies that add challenging experiences to the game. Bosses are encountered throughout the game in both the overworld and inside traditional dungeon-style levels. While some must be fought to progress through the story, most are optional. Each boss features a unique set of moves, gear, and various weaknesses and resistances to different damage types and styles of play. Successfully defeating a boss grants the player more Runes than traditional enemies drop in their respective areas, and many offer rare and/or unique armaments, armor, magic, and other items. This page contains a list of all the bosses encountered in the game.
      </p>
    </>
  );
}

function BossesTable() {
  const [bosses, setBosses] = useState([]);

  useEffect(() => {
    getBosses()
      .then((data) => setBosses(data))
      .catch(() => setBosses([]));
  }, []);

  return (
    <div className="flex-1">
      <table className="border border-zinc-700 min-w-[500px] bg-zinc-900/80 text-zinc-100 text-base rounded-xl shadow overflow-hidden">
        <thead>
          <tr>
            <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Name</th>
            <th className="border-b border-zinc-700 px-4 py-3 font-bold bg-zinc-900/80 text-[#bfa046] text-lg">Location</th>
          </tr>
        </thead>
        <tbody>
          {bosses.length === 0 ? (
            <tr>
              <td colSpan={2} className="px-4 py-6 h-10 text-center text-zinc-400">
                No bosses found.
              </td>
            </tr>
          ) : (
            bosses.map((boss, i) => (
              <tr key={i} className="hover:bg-zinc-800/60 transition">
                <td className="px-4 py-4 h-10">
                  <Link
                    href={`/bosses/${boss.id}`}
                    className="text-[#bfa046] hover:underline font-semibold"
                  >
                    {boss.name}
                  </Link>
                </td>
                <td className="px-4 py-4 h-10">{boss.location}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function BossesVideo() {
  return (
    <div className="flex-1">
      <h3 className="text-[#bfa046] text-lg font-bold mb-2">All bosses location Video</h3>
      <hr className="border-zinc-700 mb-4 w-64" />
      <div className="w-full aspect-video rounded-xl overflow-hidden flex items-center justify-center bg-zinc-200 shadow">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/EBLB5x4FuQU"
          title="All bosses location Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

async function getBosses() {
  const response = await fetch(`${apiUrl}/boss`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}