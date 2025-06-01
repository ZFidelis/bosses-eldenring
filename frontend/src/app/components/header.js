"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [bossOpen, setBossOpen] = useState(false);
  const [weaponOpen, setWeaponOpen] = useState(false);

  const closeMenus = () => {
    setBossOpen(false);
    setWeaponOpen(false);
  };

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-zinc-950 border-b border-zinc-800 shadow relative z-50">
      <div>
        <button
          onClick={() => router.push("/")}
          className="flex items-center border border-[#bfa046] rounded-lg"
          style={{ background: "none", padding: 0, cursor: "pointer", borderWidth: "2.8px" }}
        >
          <img
            src="/miniminilogo.png"
            alt="Elden Ring Logo"
            className="h-10 w-auto"
            style={{ display: "block" }}
          />
        </button>
      </div>
      <nav className="flex gap-4 relative">
        <div
          className="relative"
          onMouseEnter={() => setBossOpen(true)}
          onMouseLeave={() => setBossOpen(false)}
        >
          <button
            onClick={() => setBossOpen((v) => !v)}
            className="bg-[#bfa046] text-zinc-900 px-4 py-2 rounded font-bold hover:bg-[#d6b35c] transition flex items-center gap-2"
          >
            Bosses <span className="text-xs">&#9662;</span>
          </button>
          {bossOpen && (
            <div className="absolute left-0 mt-0 w-48 bg-zinc-900 border border-zinc-700 rounded shadow-lg py-2 z-50">
              <Link
                href="/bosses"
                className="block px-4 py-2 text-zinc-100 hover:bg-zinc-800 transition"
                onClick={closeMenus}
              >
                Bosses List
              </Link>
              <Link
                href="/bosses/edit"
                className="block px-4 py-2 text-zinc-100 hover:bg-zinc-800 transition"
                onClick={closeMenus}
              >
                Manage Bosses
              </Link>
              <Link
                href="/bosses/edit/create"
                className="block px-4 py-2 text-zinc-100 hover:bg-zinc-800 transition"
                onClick={closeMenus}
              >
                Create Boss
              </Link>
            </div>
          )}
        </div>
        <div
          className="relative"
          onMouseEnter={() => setWeaponOpen(true)}  
          onMouseLeave={() => setWeaponOpen(false)}
        >
          <button
            onClick={() => setWeaponOpen((v) => !v)}
            className="bg-[#bfa046] text-zinc-900 px-4 py-2 rounded font-bold hover:bg-[#d6b35c] transition flex items-center gap-2"
          >
            Weapons <span className="text-xs">&#9662;</span>
          </button>
          {weaponOpen && (
            <div className="absolute left-0 mt-0 w-48 bg-zinc-900 border border-zinc-700 rounded shadow-lg py-2 z-50">
              <Link
                href="/weapons"
                className="block px-4 py-2 text-zinc-100 hover:bg-zinc-800 transition"
                onClick={closeMenus}
              >
                Weapons List
              </Link>
              <Link
                href="/weapons/edit"
                className="block px-4 py-2 text-zinc-100 hover:bg-zinc-800 transition"
                onClick={closeMenus}
              >
                Manage Weapons
              </Link>
              <Link
                href="/weapons/edit/create"
                className="block px-4 py-2 text-zinc-100 hover:bg-zinc-800 transition"
                onClick={closeMenus}
              >
                Create Weapon
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}