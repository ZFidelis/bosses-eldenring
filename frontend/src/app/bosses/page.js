"use client";

import { use, useEffect, useState } from "react";

var apiUrl = "http://localhost:5243";

export default function Bosses() {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-10">
      <div className="bg-zinc-950 border-2 border-white p-10 w-[900px] max-w-full rounded">
        <h1 className="text-white text-4xl font-bold mb-4">Bosses Elden Ring</h1>
        <hr className="border-white mb-6" />
        <BossesIntroduction />
        <h2 className="text-white text-2xl font-bold mb-2">Bosses Information</h2>
        <hr className="border-white mb-6 w-44" />
        <div className="flex gap-8">
            <BossesTable />
            <BossesVideo />
        </div>
      </div>
    </div>
  );
}

function BossesIntroduction() {
    return(
        <>
        <p className="text-white text-base mb-8 leading-relaxed">
          Bosses in Elden Ring are powerful enemies that add challenging experiences to the game. Bosses are encountered throughout the game in both the overworld and inside traditional dungeon-style levels. While some must be fought to progress through the story, most are optional. Each boss features a unique set of moves, gear, and various weaknesses and resistances to different damage types and styles of play. Successfully defeating a boss grants the player more Runes than traditional enemies drop in their respective areas, and many offer rare and/or unique armaments, armor, magic, and other items. This page contains a list of all the bosses encountered in the game.
        </p>
        </>
    )
}

function BossesTable() {
    // const [bosses, setBosses] = useState({
    //     name: "", 
    //     location: ""
    // })
    const [bosses, setBosses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${apiUrl}/boss`)
        .then((res) => res.json())
        .then((data) => {
            setBosses(data);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, []);

    return(
        <>
        <table className="border border-white min-w-[260px] bg-zinc-900 text-white text-base">
            <thead>
                <tr>
                <th className="border border-white px-4 py-2 font-bold bg-zinc-900">Name</th>
                <th className="border border-white px-4 py-2 font-bold bg-zinc-900">Location</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                <tr>
                    <td colSpan={2} className="border border-white px-4 py-4 h-10 text-center">
                    Loading...
                    </td>
                </tr>
                ) : bosses.length === 0 ? (
                <tr>
                    <td colSpan={2} className="border border-white px-4 py-4 h-10 text-center">
                    No bosses found.
                    </td>
                </tr>
                ) : (
                bosses.map((boss, i) => (
                    <tr key={i}>
                    <td className="border border-white px-4 py-4 h-10">{boss.name}</td>
                    <td className="border border-white px-4 py-4 h-10">{boss.location}</td>
                    </tr>
                ))
                )}
            </tbody>
        </table>
        </>
    )
}

function BossesVideo() {
    return(
        <>
        <div className="flex-1">
            <h3 className="text-white text-lg font-bold mb-2">All bosses location Video</h3>
            <hr className="border-white mb-4 w-64" />
            <div className="w-full aspect-video rounded overflow-hidden flex items-center justify-center bg-zinc-200">
                <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/EBLB5x4FuQU"
                    title="All bosses location Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
        </>
    )
}

async function getBosses() {
    const response = await fetch(`${apiUrl}/usuario/email/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
}
