import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-[#18181b] text-white font-sans">
      <div
        className="w-full flex flex-col items-center py-10 bg-gray-950/80 shadow-lg relative"
        style={{
          backgroundImage: "url(/fundo.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-yellow-400 drop-shadow-lg relative z-10">
          Bosses and Weapons
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl text-center relative z-10">
          Welcome to your Elden Ring encyclopedia! Explore detailed information
          about legendary bosses and unique weapons, the secrets of the game
          universe.
        </p>
      </div>
      <main className="flex-1 w-full flex flex-col items-center justify-center gap-12 py-12">
        <div className="flex flex-col sm:flex-row gap-8">
          <Link
            href="/bosses"
            className="relative w-175 transition px-8 py-6 rounded-xl shadow-lg flex flex-col items-center justify-between overflow-hidden min-h-[180px] group h-[180px]"
            style={{
              backgroundImage: "url(/bosses.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all" />
            <div className="flex-1" /> 
            <span className="text-gray-100 mb-2 text-center font-bold relative z-10">
              See all bosses, their abilities, weaknesses, and rewards.
            </span>
          </Link>
          <Link
            href="/weapons"
            className="relative w-175 transition px-8 py-6 rounded-xl shadow-lg flex flex-col items-center justify-between overflow-hidden min-h-[180px] group h-[180px]"
            style={{
              backgroundImage: "url(/weapons.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all" />
            <div className="flex-1" /> {/* Spacer to push content down */}
            <span className="text-gray-100 mb-2 text-center font-bold relative z-10">
              Discover legendary weapons, their attributes, and how to obtain
              them.
            </span>
          </Link>
        </div>
        <section className="max-w-3xl text-center mt-8">
          <h2 className="text-2xl font-semibold mb-2 text-yellow-300">
            About the Project
          </h2>
          <p className="text-gray-200">
            This site is a collaborative wiki made by fans for fans of Elden
            Ring. Our goal is to gather and organize as much information as
            possible about bosses and weapons. making your journey through the
            Lands Between easier.
          </p>
        </section>
      </main>
    </div>
  );
}
