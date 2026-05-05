# Bhaduri Lab Landing Page

Internal landing page for the Bhaduri Lab. Live at **https://bhaduri-lab.elisafazzari.com**.

Built and maintained with Claude Code. This README is written for the next person who wants to make a change -- copy the prompts below into Claude (or any AI coding assistant with file-edit + git access) and let it do the work.

---

## What this app is

A password-gated lab landing page with one resource grid for members, a small admin page for Aparna and the maintainer, and a bug-report button. No user accounts -- just two shared passwords (member + admin).

**Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Resend (bug-report email), Vercel (hosting). No database. Auth is a single HMAC-signed cookie set by `/api/auth/login`.

**Repo:** https://github.com/elisafazz/bhaduri-lab-app
**Deploy:** every push to `main` auto-deploys to Vercel. There is no staging environment, so a broken push = broken production. Always run `npm run build` locally before pushing.

---

## How to ask Claude to make changes

Give Claude this whole README plus your specific request. Concrete prompt templates for the most common edits below.

### Add a link to an existing section

> Edit `data/content.ts` and add a new link to the [Onboarding | Coding | File Storage | Team GBM | Shared Resources | Links | Lab Photos | Offboarding] section:
> - label: "..."
> - description: "..."
> - url: "..."
>
> Then run `npm run build`, and if it passes, commit and push.

### Add a whole new section

> Edit `data/content.ts` and add a new section after [existing section id]:
> - id: "kebab-case-id"
> - title: "..."
> - description: "..."
> - icon: pick an unused lucide-react icon and add it to the import at the top
> - iconColor + iconBg: pick a Tailwind color pair following the existing pattern (e.g. `text-emerald-700` + `bg-emerald-50 ring-emerald-700/20`)
> - links: array with at least one `{ label, description, url }` entry
>
> Then run `npm run build`, commit, and push.

### Change a link or description

> In `data/content.ts`, find the link with label "<exact label>" and change its [url | description | label] to "<new value>". Run `npm run build`, commit, and push.

### Edit the admin page checklists (onboarding/offboarding/always)

> In `app/admin/page.tsx`, edit the [ONBOARDING_ITEMS | OFFBOARDING_ITEMS | ALWAYS_ITEMS] array. Each item is `{ key, label }` (or `{ key, label, url }` for clickable items). Add/remove/edit entries as needed, then run `npm run build`, commit, and push.

### Change the colors or fonts

> In `tailwind.config.ts` and `app/globals.css`, the palette uses `#1C1D2E` (text), `#8B9DC3` (primary), `#6B75B0` (secondary), `#D4D9EE` (border), `#F7F8FC` (page background). Replace these with `<new palette>` everywhere they appear and update the `::selection` color in globals.css. Run `npm run build`, commit, and push.

### Rotate the lab passwords

1. In Vercel: project `bhaduri-lab-app` -> Settings -> Environment Variables. Edit `LAB_MEMBER_PASSWORD` and/or `LAB_ADMIN_PASSWORD` and save.
2. Vercel -> Deployments -> hit "Redeploy" on the latest production deployment so the new value is picked up.
3. Tell the lab the new password.

No code change needed.

### Rotate the auth signing secret (invalidates everyone's session)

1. Generate a new secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. In Vercel env vars, replace `LAB_AUTH_SECRET` with the new value, save, redeploy.
3. Everyone will need to sign in again.

### "I forgot the password and locked myself out"

The maintainer (admin) can read the values directly from Vercel env vars. Anyone else: ask the maintainer.

---

## Local development

```bash
git clone https://github.com/elisafazz/bhaduri-lab-app
cd bhaduri-lab-app
npm install
cp .env.local.example .env.local   # if an example file exists; otherwise create .env.local manually
npm run dev
```

Required `.env.local`:

```
LAB_MEMBER_PASSWORD=anything-for-local
LAB_ADMIN_PASSWORD=anything-else-for-local
LAB_AUTH_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
RESEND_API_KEY=                     # only needed if testing the bug report flow
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Local and production must use **different** `LAB_AUTH_SECRET` values.

App runs at http://localhost:3000.

---

## File map

```
app/
  page.tsx              Resource grid (the homepage members see)
  layout.tsx            Reads role cookie, passes to Header
  login/page.tsx        Public sign-in page
  admin/page.tsx        Admin-only checklist reference
  api/
    auth/login/         POST { password } -> sets signed cookie
    auth/logout/        POST -> clears cookie
    report-bug/         POST { description, name? } -> emails maintainer via Resend
components/
  Header.tsx            Top bar (logo, admin link, sign in/out, report bug)
  Footer.tsx
  SectionCard.tsx       Card used for each section on the homepage
  LoginForm.tsx         Single-password form
  SignOutButton.tsx
  ReportBugButton.tsx   Modal bug-report form
data/
  content.ts            All section + link data lives here
lib/
  auth.ts               HMAC sign/verify helpers, cookie name
middleware.ts           Gates everything except /login and /api/*
```

If you only want to add or edit lab resources, you only need to touch `data/content.ts`. Everything else is plumbing.

---

## Deploy

`git push origin main` -> Vercel auto-deploys in ~30-60 seconds.

Before pushing:

1. `npm run build` must pass locally with no errors.
2. `git status` should be clean except for the changes you intend to ship.
3. After Vercel finishes, hit https://bhaduri-lab.elisafazzari.com and confirm your change is live. HTTP 200 alone does not prove the new build deployed -- look for visible evidence of your edit.

The custom domain `bhaduri-lab.elisafazzari.com` is wired via a Namecheap CNAME pointing to a Vercel-provided value. Do not change DNS without first updating it in the Vercel dashboard.

---

## Admin & maintainer notes

- Maintainer (as of 2026-05): Elisa Fazzari (elisafazzari815@gmail.com). Contact her for env-var access, password rotation, or repo-permission changes.
- Bug reports go to the maintainer's email via Resend.
- The `/admin` page is a static reference checklist. Per-member checklist tracking was removed -- the page is now read-only.
- There is no database. There is no Supabase. There are no user accounts. If you find yourself adding any of those, stop and ask whether the simpler thing is enough.

---

## License

Internal lab tool. No license -- ask the maintainer before reusing.
