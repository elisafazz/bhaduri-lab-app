# Fork this repo for your own lab

This is a complete, working lab landing page (resource grid + password gate + admin checklist + bug-report email). If you want one for your lab, you can copy this repo, rebrand it, and have it live on your own URL in about an hour. **You do not need to know Next.js or React.** Hand this file to Claude (or another AI coding assistant with file-edit + git access) and follow along.

If you're trying to edit the existing Bhaduri Lab site, this is the wrong file -- use `README.md` instead.

---

## What you get

- A password-gated landing page with a card grid of lab resources (drives, protocols, GitHub repos, training links, photos, whatever).
- Two shared passwords (member + admin). No user accounts, no database, no per-person logins.
- An admin-only `/admin` page with onboarding/offboarding checklist references.
- A "Report Bug" button that emails the maintainer.
- Auto-deploy to Vercel on every git push to `main`.

**Tech stack you don't have to think about:** Next.js 14, TypeScript, Tailwind CSS, Resend (email), Vercel (hosting). HMAC-signed cookie auth, no third-party auth provider.

**What it costs:** $0 if you stay on free tiers. Vercel free, GitHub free, Resend free up to 3,000 emails/month. A custom domain is optional and costs ~$10-15/year.

---

## Before you start, you need

1. A **GitHub account**. Free.
2. A **Vercel account** (sign in with GitHub). Free.
3. (Optional) A **Resend account** if you want the bug-report button to work. Free.
4. (Optional) A **domain registrar account** (Namecheap, Cloudflare, Google Domains) if you want a custom URL. Otherwise Vercel gives you `your-lab.vercel.app` for free.
5. A **logo image** (PNG or JPG, square, ideally 512x512 or larger).
6. A **list of links** you want on the site (Google Drives, Box folders, GitHub repos, training portals, etc.).

---

## The five-minute version: hand this to Claude

Open Claude Code in an empty folder and paste this prompt:

> I want my own lab landing page based on https://github.com/elisafazz/bhaduri-lab-app. My lab is called **<YOUR LAB NAME>**, run by **<PI NAME>**, focused on **<one-sentence research description>**. I want the URL to be **<your-lab.vercel.app | your-custom-domain.com>**. My logo is at **<path to logo file>**. My color preference is **<periwinkle / forest green / burgundy / etc.>**.
>
> Please:
> 1. Fork or template-clone the repo into a new GitHub repo under my account (ask me which org/account if I have multiple).
> 2. Replace the logo and rename the lab everywhere it appears in code (header, page metadata, footer, README, admin contact email).
> 3. Wipe `data/content.ts` and ask me what sections and links I want, then build the new content.
> 4. Update `app/admin/page.tsx` checklists -- ask me what onboarding and offboarding steps my lab uses.
> 5. Update the color palette in `tailwind.config.ts` and `app/globals.css` to match my preference.
> 6. Generate a `LAB_AUTH_SECRET` and ask me to pick `LAB_MEMBER_PASSWORD` and `LAB_ADMIN_PASSWORD`.
> 7. Walk me through linking the GitHub repo to Vercel and setting the three env vars in the Vercel dashboard.
> 8. Tell me what to do with the bug-report email (sign up for Resend, get an API key, add to Vercel) or how to disable it.
> 9. After it deploys, verify it's live by curl-ing the login page.

Claude will work through this with you, asking for the bits it needs and doing the rest. The rest of this file is the manual version of the same steps in case you'd rather drive yourself or want to understand what Claude is doing.

---

## Manual version, step by step

### 1. Get your own copy of the repo

Easiest: on GitHub, go to https://github.com/elisafazz/bhaduri-lab-app, click "Use this template" -> "Create a new repository". Name it `<your-lab>-app` or similar. Make it private if you want.

Or fork it via the "Fork" button (this preserves the link to the original; "Use this template" doesn't).

Then clone locally:

```bash
git clone https://github.com/<your-username>/<your-repo>
cd <your-repo>
npm install
```

### 2. Rebrand the obvious stuff

Files where the words "Bhaduri Lab" or "bhaduri-lab" appear -- replace each with your lab's name:

- `app/layout.tsx` -- the `metadata.title` and `metadata.description`.
- `app/login/page.tsx` -- "Sign in" page text.
- `app/page.tsx` -- the hero `<h1>` and subtitle.
- `app/admin/page.tsx` -- the admin page heading.
- `components/Header.tsx` -- the lab name shown in the top bar, the logo `alt` attribute.
- `components/Footer.tsx` -- footer text and credit line.
- `components/ReportBugButton.tsx` -- the modal heading.
- `app/api/report-bug/route.ts` -- the email subject line and `to:` address (replace with your email).
- `package.json` -- `name` field.
- `README.md` -- the user-facing maintainer doc, rewrite to your lab.

### 3. Replace the logo

Drop your logo at `public/<your-lab>-logo.jpg` (or `.png`). Then update the `src` in:

- `app/layout.tsx` (if referenced there)
- `app/login/page.tsx`
- `app/page.tsx`
- `components/Header.tsx`

You can also delete the old `public/bhaduri-lab-logo.jpg` once nothing references it.

### 4. Replace the content

This is the heart of it. Open `data/content.ts`. Each entry in the `sections` array becomes a card on the homepage. Edit, add, or remove sections. For each section pick:

- `id` -- unique kebab-case
- `title` -- shown on the card
- `description` -- shown under the title (optional)
- `icon` -- pick one from https://lucide.dev (browse the icon list, then add the import at the top of the file)
- `iconColor` + `iconBg` -- a Tailwind color pair, e.g. `text-blue-700` + `bg-blue-50 ring-blue-700/20`
- `links` -- array of `{ label, description?, url, badge? }`

Use `#placeholder` as the URL for any link you don't have yet -- you can come back and fill them in later.

### 5. Update the admin checklists

`app/admin/page.tsx` has three hardcoded arrays: `ONBOARDING_ITEMS`, `OFFBOARDING_ITEMS`, `ALWAYS_ITEMS`. Edit them to match your lab's onboarding/offboarding flow. Each item is `{ key, label }` (or add `url` to make it clickable).

### 6. Pick your colors

The palette lives in two places. Find/replace these hex values across both files:

| Token | Default (Bhaduri periwinkle) |
|---|---|
| Page background | `#F7F8FC` |
| Card background | `#FFFFFF` |
| Border | `#D4D9EE` |
| Header background | `#1C1D2E` |
| Primary | `#8B9DC3` |
| Secondary | `#6B75B0` |
| Body text | `#1C1D2E` |
| Muted text | `#6B7280` |

Files to update: `tailwind.config.ts`, `app/globals.css`, and any `bg-[#...]` / `text-[#...]` arbitrary-value classes scattered across components.

### 7. Set up auth

Generate a random signing secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Pick a member password (you'll share with the whole lab) and an admin password (you keep). Anything alphanumeric is fine; ~12+ characters recommended.

Create `.env.local` for testing locally:

```
LAB_MEMBER_PASSWORD=your-member-password
LAB_ADMIN_PASSWORD=your-admin-password
LAB_AUTH_SECRET=<the hex string you generated>
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Run `npm run dev`, open http://localhost:3000, sign in with each password, and confirm the resource grid + admin page work.

**Use a different `LAB_AUTH_SECRET` for production than for local.**

### 8. Set up Vercel

1. Go to https://vercel.com/new and import your GitHub repo. Vercel will detect Next.js automatically.
2. Before clicking "Deploy", expand the "Environment Variables" section and add the same three env vars above (with a freshly-generated production `LAB_AUTH_SECRET`). Add to Production, Preview, and Development.
3. Click Deploy. Wait 30-60 seconds.
4. Vercel gives you `your-repo.vercel.app`. Open it, sign in, confirm it works.

### 9. Optional: set up Resend for the bug-report button

1. Sign up at https://resend.com.
2. Create an API key (Account -> API Keys -> Create).
3. In Vercel env vars, set `RESEND_API_KEY` to the new key. Redeploy.
4. In `app/api/report-bug/route.ts`, change the `to:` field to your email.
5. (Optional) Verify a custom sending domain on Resend if you don't want emails to come from `onboarding@resend.dev`.

If you skip this, the bug-report button is still there but submissions silently fail. To remove the button entirely, delete `<ReportBugButton />` from `components/Header.tsx` and you can also delete `components/ReportBugButton.tsx` and `app/api/report-bug/`.

### 10. Optional: custom domain

1. Buy a domain (or use a subdomain of one you own).
2. In Vercel: project -> Settings -> Domains -> Add. Vercel gives you a CNAME target (specific to your project, not a generic value).
3. In your registrar's DNS panel, add a CNAME record pointing your subdomain (e.g. `lab`) to the value Vercel gave you.
4. Wait a few minutes for DNS to propagate, then visit your custom URL.

---

## After it's live

- Bookmark the GitHub repo URL and the Vercel project URL.
- Save your member + admin passwords in a password manager. There is no recovery flow.
- Tell your lab the member password and the URL.
- For any future edits, hand the repo's `README.md` to Claude with what you want changed -- it has copy-pastable prompts for the common cases.

---

## Things to know

- **No database.** All content lives in code (`data/content.ts` and `app/admin/page.tsx`). To change content, you edit code and push. This is intentional -- it eliminates a whole class of failure modes (auth provider auto-pause, DB migrations, RLS policies). For a lab landing page that updates a few times a year, this is the right tradeoff.
- **Two passwords means coarse access control.** Anyone with the member password is in. If someone leaves the lab, rotate the member password and tell everyone the new one. If you need per-person revocation, you've outgrown this app.
- **Auto-deploy means a broken push breaks production.** Always run `npm run build` locally before pushing. There is no staging environment.
- **The signing secret is what makes the cookie tamper-proof.** If `LAB_AUTH_SECRET` leaks, anyone can forge an admin cookie. Rotate it (and force everyone to re-sign-in) by changing the env var in Vercel.

---

## Credit

Original at https://github.com/elisafazz/bhaduri-lab-app, built by Elisa Fazzari for the Bhaduri Lab at UCLA. Reuse freely for your own lab. If you make improvements that would help others, consider opening a PR upstream.
