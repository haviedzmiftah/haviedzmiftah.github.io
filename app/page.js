import Hero from "@/components/Hero";
import { skills } from "@/data/skills";

export const metadata = {
  title: "Home",
  description: "Portfolio dan blog pribadi Haviedz Miftah.",
};

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
            Skill & Expertise
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800/70"
              >
                <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {skill.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
