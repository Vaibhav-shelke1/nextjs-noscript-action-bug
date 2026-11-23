# Next.js 16.4.6 reproductions

Three independent bugs, one page each. All use `cacheComponents: true` (the default in `create-next-app`).

| Bug | Page | Mode |
|---|---|---|
| [1. No-JS server action returns a blank page](#bug-1-no-js-server-action-on-a-partially-prerendered-page-returns-a-blank-page) | `app/bug-1-blank-page` | `next build` + `next start` |
| [2. cookies() InvariantError after a no-JS action](#bug-2-cookies-invarianterror-after-a-no-js-server-action-in-dev) | `app/bug-2-cookies-error` | `next dev` |
| [4. New export is undefined until `next dev` restarts](#bug-4-new-export-in-an-already-loaded-module-is-undefined-until-next-dev-restarts) | `app/bug-4-stale-export` + `lib/shared.tsx` | `next dev` |

Install once: `npm install`

To disable JavaScript in Chrome: DevTools (F12) → `Ctrl+Shift+P` → "Disable JavaScript" → reload.

---

## Bug 1: No-JS server action on a partially prerendered page returns a blank page

**Files:** `app/bug-1-blank-page/page.tsx` (static shell + `await connection()` inside `<Suspense>`), `form.tsx` (`useActionState`), `actions.ts` (logs `ACTION RAN`).

### Steps

1. `npm run build` (the output shows `◐ /bug-1-blank-page` = Partial Prerender)
2. `npm run start`
3. Open http://localhost:3000/bug-1-blank-page and disable JavaScript.
4. Click **Submit**.

### Current behavior

- The server action runs (`ACTION RAN: test` is printed in the terminal).
- The browser shows a **blank page**.
- The POST response (`x-nextjs-cache: HIT`, `x-nextjs-prerender: 1`) contains only `<script>` tags with the RSC payload (including the action result `{"count":1}`); it has no `<html>`, `<body>` or prerendered markup.

### Expected behavior

The page renders as full HTML showing `Action ran 1 times`.

### Comparison

With JavaScript enabled, the same form works and shows `Action ran 1 times`.

---

## Bug 2: cookies() InvariantError after a no-JS server action in dev

**Files:** `app/bug-2-cookies-error/page.tsx` (a Suspense-wrapped server component calls `cookies()`), `form.tsx`, `actions.ts`.

### Steps

1. `npm run dev`
2. Open http://localhost:3000/bug-2-cookies-error and disable JavaScript.
3. Click **Submit**.

### Current behavior

The terminal shows:

```
ACTION RAN: test
⨯ Error [InvariantError]: Invariant: Received an underlying cookies object that does not match either `cookies` or `mutableCookies`. This is a bug in Next.js.
```

### Expected behavior

`cookies()` resolves normally while rendering after the action; no internal error is logged.

---

## Bug 4: New export in an already loaded module is undefined until `next dev` restarts

**Files:** `lib/shared.tsx` (exports `STYLE_A`), `app/bug-4-stale-export/page.tsx` (imports `STYLE_A`).

### Steps

1. `npm run dev`
2. Open http://localhost:3000/bug-4-stale-export. It shows `STYLE_A.new = red`.
3. **Without stopping the dev server**, add this line to the end of `lib/shared.tsx`:

   ```ts
   export const STYLE_B: Record<string, string> = { new: "green", old: "gray" };
   ```

4. Create `app/bug-4-stale-export/two/page.tsx`:

   ```tsx
   import { connection } from "next/server";
   import { Suspense } from "react";
   import { STYLE_B } from "@/lib/shared";

   async function Two() {
     await connection();
     return <p>two {STYLE_B.new}</p>;
   }

   export default function Page() {
     return (
       <Suspense fallback={null}>
         <Two />
       </Suspense>
     );
   }
   ```

5. Open http://localhost:3000/bug-4-stale-export/two.

### Current behavior

The terminal shows `TypeError: Cannot read properties of undefined (reading 'new')` at `STYLE_B.new`. Reloading does not help.

### Expected behavior

The new export is available immediately and the page shows `two green`.

### Comparison

Stop and restart `npm run dev`, then reload the page: it works and shows `two green` with no code changes. Reproduced twice in a row (repeating with a third export and page gives the same error).

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
