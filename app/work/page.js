import { education } from "@/data/education";
import { experience } from "@/data/experience";

export const metadata = {
  title: "Work | Haviedz Miftah",
  description: "Riwayat pengalaman kerja dan pendidikan.",
};

export default function WorkPage() {
  const items = [...experience, ...education];

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
          Work & Education
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
          Journey
        </h1>
      </div>

      <div className="relative border-l border-slate-200 pl-6 dark:border-slate-700">
        {items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="relative mb-10 last:mb-0"
          >
            <span className="absolute -left-[1.77rem] top-1.5 block h-3.5 w-3.5 rounded-full border-4 border-white bg-violet-600 dark:border-slate-900" />
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h2>
                  {item.role ? (
                    <p className="text-sm text-violet-600 dark:text-violet-400">
                      {item.role}
                    </p>
                  ) : null}
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.date}
                </span>
              </div>

              {item.description && Array.isArray(item.description) ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-300">
                  {item.description.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : item.description ? (
                <p className="mt-4 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
