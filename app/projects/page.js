import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects | Haviedz Miftah",
  description: "Daftar project dan karya yang pernah dibuat.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
          Projects
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
          Selected Work
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-violet-300 dark:border-slate-700 dark:bg-slate-900/60"
          >
            <div className="mb-4 h-40 rounded-2xl bg-gradient-to-br from-violet-100 via-white to-slate-200 dark:from-violet-500/20 dark:via-slate-800 dark:to-slate-900" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {project.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {project.description}
            </p>
            {project.link && project.link !== "#" ? (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex text-sm font-semibold text-violet-600 transition hover:text-violet-500 dark:text-violet-400"
              >
                View project →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  );
}
