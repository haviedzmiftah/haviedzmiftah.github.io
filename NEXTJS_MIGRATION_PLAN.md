# Rencana Migrasi + Redesign: Jekyll → Next.js (tema ala enji.dev)

**Repo asal:** `haviedzmiftah/haviedzmiftah.github.io`
**Referensi tema:** `enji.dev` 'https://github.com/enjidev/enji.dev.git' (Enji Kusnadi) — diambil **tampilan & struktur halamannya saja** (Home, Work, Projects, Blog), **tanpa** fitur reactions/database
**Tujuan dokumen ini:** brief yang tinggal disalin ke GitHub Copilot (Chat/Agent mode di VS Code) fase demi fase.

> **Update:** karena nggak pakai database, situs ini **bisa tetap full-static** dan **tetap gratis di GitHub Pages** pakai domain custom kamu yang sekarang (`CNAME` tetap dipakai, sama seperti rencana paling awal). Nggak perlu pindah ke Vercel.

---

## 0. Apa yang diambil dari enji.dev, apa yang tidak

| Bagian enji.dev                                                                              | Diambil?    | Catatan                                                                                                                                          |
| -------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Halaman Home, Work, Projects, Blog                                                           | ✅          | struktur multi-halaman, bukan 1 halaman scroll seperti sebelumnya                                                                                |
| Tailwind + palet putih/`slate-900` (light) ↔ `slate-900`/`slate-200` (dark) + warna `accent` | ✅          | Bagian 3                                                                                                                                         |
| Font **Plus Jakarta Sans**                                                                   | ✅          | via `next/font/google`                                                                                                                           |
| Background pola grid titik-titik halus                                                       | ✅          |                                                                                                                                                  |
| Dark/light toggle (`next-themes`)                                                            | ✅          |                                                                                                                                                  |
| Animasi transisi halaman (`framer-motion`)                                                   | ✅          |                                                                                                                                                  |
| Blog MDX + Table of Contents scrollspy                                                       | ✅          | MDX itu cuma file, statis — **tidak butuh server/database**                                                                                      |
| Emoji reactions per post                                                                     | ❌          | ini yang butuh Prisma + Postgres — di-skip sesuai permintaanmu                                                                                   |
| Command palette (`Cmd+K`) / accent color switcher                                            | ⏸️ opsional | keduanya jalan di client-side saja, nggak butuh database, jadi tetap bisa ditambah belakangan kalau mau (lihat Fase 11-12), tapi bukan prioritas |
| Monorepo Turborepo                                                                           | ❌          | overkill untuk 1 situs, cukup 1 project Next.js biasa                                                                                            |

---

## 1. Keputusan stack

- **JavaScript** (bukan TypeScript).
- **Next.js App Router**, **static export** (`output: 'export'`) — tetap bisa full di-generate jadi HTML statis karena semua konten (data resume + post blog MDX) sudah fix saat build, nggak ada bagian yang butuh server saat runtime.
- **Tailwind CSS**, dark mode via `next-themes`, palet & warna `accent` di Bagian 3.
- **Font**: Plus Jakarta Sans lewat `next/font/google`.
- **Framer Motion** untuk transisi halaman.
- **MDX** (`@next/mdx`) untuk blog — tetap statis, di-generate ke HTML saat `next build`.
- **Hosting**: tetap **GitHub Pages**, domain custom tetap lewat `public/CNAME`, deploy tetap pakai GitHub Actions (build → folder `out/` → publish).

---

## 2. Struktur folder target

```
/
├─ app/
│  ├─ layout.js              # ThemeProvider (next-themes), font, Navigation, Footer
│  ├─ page.js                # Home
│  ├─ globals.css
│  ├─ work/page.js           # Experience + Education (dari data lama)
│  ├─ projects/page.js       # Daftar project (dari Projects.yml lama)
│  └─ blog/
│     ├─ page.js             # Daftar post
│     └─ [slug]/page.js      # Render 1 post MDX (statis, generateStaticParams)
├─ components/
│  ├─ Navigation.js           # nav + theme toggle
│  ├─ Footer.js
│  ├─ Hero.js                 # intro di Home
│  ├─ WorkTimeline.js         # render Experience/Education
│  ├─ ProjectCard.js
│  ├─ PostCard.js
│  └─ TableOfContents.js      # scrollspy utk halaman blog post
├─ content/
│  └─ blog/*.mdx              # tulisan blog (mulai dari 1-2 post contoh)
├─ data/
│  ├─ education.js
│  ├─ experience.js
│  ├─ languages.js
│  ├─ projects.js
│  └─ skills.js
├─ providers/
│  └─ FramerMotionProvider.js
├─ public/
│  ├─ CNAME
│  ├─ favicon.png
│  ├─ img/
│  └─ svgs/
├─ tailwind.config.js         # colors.accent, bg-grid utility, darkMode: 'class'
├─ next.config.js             # output: 'export', images.unoptimized: true
├─ next-sitemap.config.js
└─ .github/workflows/deploy.yml
```

---

## 3. Design tokens (adaptasi dari enji.dev)

| Token                   | Light        | Dark         |
| ----------------------- | ------------ | ------------ |
| Background              | `white`      | `slate-900`  |
| Teks utama              | `slate-900`  | `slate-200`  |
| Divider/border          | `slate-200`  | `slate-800`  |
| Accent (default violet) | `violet-600` | `violet-400` |

- Background halaman pakai pola grid titik-titik halus (`bg-grid`, class utility custom, warnanya ngikut `divider`).
- Font: **Plus Jakarta Sans** untuk semua teks, font mono default Tailwind cukup untuk cuplikan kode di blog.
- Fokus ring & text-selection pakai warna `accent` (`ring-accent-400`, `selection:bg-accent-200/60`).
- Transisi antar halaman: fade + sedikit translate-y pakai `framer-motion`, durasi singkat (~200-300ms), hormati `prefers-reduced-motion`.

---

## 4. Fase pengerjaan

- [ ] **Fase 1 — Setup proyek**
      `create-next-app` App Router, JavaScript, ESLint yes, Tailwind yes. Install `next-themes`, `framer-motion`, `@next/mdx`, `@mdx-js/react`, `clsx`.

- [ ] **Fase 2 — Migrasi data**
      Convert `_data/*.yml` jadi `data/*.js` (`education.js`, `experience.js`, `languages.js`, `projects.js`, `skills.js`), struktur field sama persis seperti YAML aslinya.

- [ ] **Fase 3 — Design tokens & tema**
      `tailwind.config.js`: `darkMode: 'class'`, warna `accent` (violet), `divider` (slate-200/800), utility `bg-grid`. Setup `next/font/google` Plus Jakarta Sans. Setup `next-themes` di `app/layout.js` + toggle dark/light di `Navigation`.

- [ ] **Fase 4 — Layout global**
      `Navigation` (logo, link Home/Work/Projects/Blog, theme toggle), `Footer` (link sosial media dari `_config.yml` lama), `FramerMotionProvider` untuk transisi antar halaman.

- [ ] **Fase 5 — Halaman Home**
      `Hero` (nama, ringkasan peran, foto profil, CTA ke `/work` dan `/projects`) pakai data dari `data/`.

- [ ] **Fase 6 — Halaman Work**
      `WorkTimeline` merender `experience.js` + `education.js`, urut tanggal terbaru dulu.

- [ ] **Fase 7 — Halaman Projects**
      `ProjectCard` merender `projects.js` sebagai grid (thumbnail, deskripsi, link demo/repo).

- [ ] **Fase 8 — Blog (MDX)**
      Setup `@next/mdx`, folder `content/blog/`, `app/blog/page.js` (list), `app/blog/[slug]/page.js` (render + `generateStaticParams` supaya tetap ke-export statis) + `TableOfContents` scrollspy. Isi 1-2 post contoh dulu.

- [ ] **Fase 9 — SEO, metadata, static export config**
      Metadata API per halaman, `next-sitemap`, dan di `next.config.js` set `output: 'export'` + `images.unoptimized: true`.

- [ ] **Fase 10 — Deploy & cutover**
      `.github/workflows/deploy.yml` (build → `out/` → GitHub Pages, pastikan `public/CNAME` ikut ter-deploy). QA responsive + dark/light + Lighthouse, baru hapus file Jekyll lama dan pindahkan project ke root repo.

### Opsional (tidak butuh database, boleh nyusul kapan saja)

- [ ] **Fase 11 — Accent color switcher**
      Plugin `tailwindcss-accent`, komponen pemilih warna accent (violet/blue/dst) disimpan di `localStorage` (bukan database).

- [ ] **Fase 12 — Command palette**
      Modal `Cmd+K` untuk navigasi cepat antar halaman (Home/Work/Projects/Blog), murni client-side.

---

## 5. Prompt siap-pakai untuk Copilot

**Fase 1:**

> Buatkan project Next.js baru menggunakan App Router, JavaScript (bukan TypeScript), ESLint aktif, Tailwind CSS aktif. Install juga `next-themes`, `framer-motion`, `@next/mdx`, `@mdx-js/react`, `clsx`.

**Fase 2:**

> Di folder `data/`, buatkan file `education.js`, `experience.js`, `languages.js`, `projects.js`, `skills.js` berisi `export default [...]` dengan struktur yang sama persis seperti file YAML berikut (saya lampirkan `_data/Experience.yml` dkk), jangan ubah nama field atau urutan data.

**Fase 3:**

> Di `tailwind.config.js`, set `darkMode: 'class'`, tambahkan warna `divider: { light: colors.slate[200], dark: colors.slate[800] }` dan color scale `accent` berbasis violet (`colors.violet`). Tambahkan utility `bg-grid` berupa background SVG pola titik-titik/garis putus halus. Setup font Plus Jakarta Sans lewat `next/font/google` di `app/layout.js` dan hubungkan ke `fontFamily.sans` di Tailwind config. Setup `ThemeProvider` dari `next-themes` (attribute `class`, defaultTheme `system`) membungkus children di `app/layout.js`.

**Fase 4:**

> Buatkan komponen `Navigation.js` (logo, link ke Home/Work/Projects/Blog, tombol toggle dark/light pakai `useTheme` dari `next-themes`) dan `Footer.js` (link sosial media & email, ambil dari data `_config.yml` berikut yang saya lampirkan). Buatkan juga `providers/FramerMotionProvider.js` yang membungkus tiap halaman dengan fade+translate-y transition memakai `framer-motion`, hormati `prefers-reduced-motion`.

**Fase 5:**

> Buatkan komponen `Hero.js` untuk halaman Home: nama, foto profil, ringkasan singkat peran (guru Informatika, videografer, desainer, web developer), dan 2 tombol CTA ke `/work` dan `/projects`. Style pakai palet accent/divider dari tailwind config, background pakai utility `bg-grid`.

**Fase 6:**

> Buatkan halaman `app/work/page.js` dan komponen `WorkTimeline.js` yang merender data `experience.js` dan `education.js` sebagai timeline vertikal terurut dari yang terbaru, tiap item berupa card dengan judul, institusi/perusahaan, rentang tanggal, dan deskripsi.

**Fase 7:**

> Buatkan halaman `app/projects/page.js` dan komponen `ProjectCard.js` yang merender `projects.js` sebagai grid responsif (1 kolom mobile, 2-3 kolom desktop), tiap card ada thumbnail, judul, deskripsi singkat, dan link ke demo/repo.

**Fase 8:**

> Setup `@next/mdx` di `next.config.js` untuk mendukung file `.mdx` di `content/blog/`. Buatkan `app/blog/page.js` yang me-list semua file MDX (judul, tanggal, ringkasan dari frontmatter) dan `app/blog/[slug]/page.js` dengan `generateStaticParams` yang merender isi MDX lengkap dengan `TableOfContents.js` (scrollspy pakai `IntersectionObserver`).

**Fase 9:**

> Tambahkan Metadata API Next.js (title/description/OG image) di tiap halaman (`app/page.js`, `app/work/page.js`, `app/projects/page.js`, `app/blog/page.js`). Install dan konfigurasi `next-sitemap`. Update `next.config.js` supaya `output: 'export'` dan `images.unoptimized: true`.

**Fase 10:**

> Buatkan GitHub Actions workflow `.github/workflows/deploy.yml` yang build project Next.js (`npm ci && npm run build`) lalu deploy folder `out/` ke GitHub Pages, pastikan file `public/CNAME` ikut ter-deploy.

---

## 6. Hal yang perlu kamu putuskan sendiri (bukan tugas Copilot)

- Kapan mulai isi konten blog beneran (Fase 8 cuma nyiapkan sistemnya).
- Warna accent default (violet atau warna lain) — violet cuma starting point mengikuti enji.dev.
- Apakah Fase 11 (accent switcher) dan Fase 12 (command palette) worth ditambah, atau cukup berhenti di Fase 10.
- Review tiap PR dari Copilot sebelum merge, terutama Fase 2 (data) dan Fase 3-5 (tema/desain).
