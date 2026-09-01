import Image from "next/image";
import Link from "next/link";

import { profile } from "@/data/skills";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-20">
      <div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
          Teacher • Fullstack Developer
        </p>
        <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
          {profile.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Informatics Teacher & Aspiring Web Developer. Berpengalaman mengajar
          sejak 2020 sampai sekarang, kini mendalami pengembangan web modern
          (JavaScript, React/Next.js) sambil merintis Sabda Academy — bimbel
          koding untuk anak-anak.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/work"
            className="rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Lihat Work
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-violet-600 dark:hover:text-violet-400"
          >
            Project Saya
          </Link>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-md">
        <div className="absolute -inset-4 rounded-[2rem] bg-violet-200/60 blur-2xl dark:bg-violet-500/10" />
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/80 dark:border-slate-700 dark:bg-slate-800 dark:shadow-slate-950/40">
          <Image
            src="/profil.jpg"
            alt={profile.name}
            width={640}
            height={640}
            priority
            className="h-[420px] w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
