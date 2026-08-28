import fs from "fs";
import path from "path";

const postsDir = path.join(process.cwd(), "content/blog");

function getPostBySlug(slug) {
  const filePath = path.join(postsDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return { frontMatter: {}, content: source };
  }

  const [, frontMatterBlock, content] = match;
  const frontMatter = {};

  frontMatterBlock.split("\n").forEach((line) => {
    const index = line.indexOf(":");
    if (index !== -1) {
      const key = line.slice(0, index).trim();
      const value = line.slice(index + 1).trim();
      frontMatter[key] = value.replace(/^['"]|['"]$/g, "");
    }
  });

  return { frontMatter, content };
}

export function generateStaticParams() {
  if (!fs.existsSync(postsDir)) {
    return [{ slug: "welcome" }];
  }

  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".mdx"));
  return files.map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export function generateMetadata({ params }) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  return {
    title: post?.frontMatter?.title
      ? `${post.frontMatter.title} | Haviedz Miftah`
      : "Blog | Haviedz Miftah",
    description:
      post?.frontMatter?.summary || "Artikel blog personal Haviedz Miftah.",
  };
}

export default function BlogPostPage({ params }) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Post not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/60">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {post.frontMatter.date || "2026-08-28"}
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100">
          {post.frontMatter.title || "Welcome to my blog"}
        </h1>
        <div className="prose prose-slate mt-8 max-w-none dark:prose-invert">
          <p>{post.content}</p>
        </div>
      </article>
    </main>
  );
}
