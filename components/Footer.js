import Link from "next/link";

const socialLinks = [
  { href: "https://github.com/haviedzmiftah", label: "GitHub" },
  { href: "https://www.linkedin.com/in/haviedzmiftah", label: "LinkedIn" },
  { href: "https://instagram.com/haviedzmiftah", label: "Instagram" },
  { href: "https://www.youtube.com/@haviedzmiftah", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 dark:text-slate-300">
        <p>© 2025 Haviedz Miftah</p>

        <div className="flex flex-wrap items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-violet-600 dark:hover:text-violet-400"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:haviedzmiftah@gmail.com"
            className="transition-colors hover:text-violet-600 dark:hover:text-violet-400"
          >
            haviedzmiftah@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
