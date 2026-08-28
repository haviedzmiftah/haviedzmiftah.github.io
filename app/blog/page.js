const posts = [
  {
    title: "Welcome to my blog",
    description: "Catatan singkat tentang tujuan dan fokus blog ini.",
    date: "2026-08-28",
    slug: "welcome",
  },
];

export const metadata = {
  title: "Blog | Haviedz Miftah",
  description: "Tulisan dan refleksi singkat dari Haviedz Miftah.",
};

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
          Blog
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
          Thinking out loud
        </h1>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/60"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {post.date}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {post.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              {post.description}
            </p>
            <a
              href={`/blog/${post.slug}`}
              className="mt-5 inline-flex text-sm font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400"
            >
              Read article →
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
