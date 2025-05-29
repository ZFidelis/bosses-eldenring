"use client";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-8 bg-black border-t border-gray-800 mt-8">
      <span className="text-gray-400">
        © {new Date().getFullYear()} Elden Ring Bosses and Weapons. Some rights reserved.
      </span>
      <div className="flex gap-4">
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-gray-300"
        >
          Powered by Next.js
        </a>
        <a
          href="https://vercel.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-gray-300"
        >
          Deploy on Vercel
        </a>
      </div>
    </footer>
  );
}