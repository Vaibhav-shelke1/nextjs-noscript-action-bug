# Reproduction: no-JS server action on a partially prerendered page returns a blank page

Minimal reproduction for Next.js 16.4.6 with `cacheComponents: true` (the default in `create-next-app`).

## Setup

- `app/page.tsx`: a static shell plus one dynamic part (`await connection()` inside `<Suspense>`), so the route is **partially prerendered** (`◐ /` in the build output).
- `app/form.tsx`: a client form using `useActionState`.
- `app/actions.ts`: a server action that logs `ACTION RAN` and returns `{ count }`.

## Steps

1. `npm install`
2. `npm run build` (the output shows `◐ /` = Partial Prerender)
3. `npm run start`
4. Open http://localhost:3000 in Chrome.
5. Disable JavaScript: DevTools (F12) → `Ctrl+Shift+P` → "Disable JavaScript" → reload.
6. Click **Submit**.

## Current behavior

- The server action runs (`ACTION RAN: test` is printed in the terminal).
- The browser shows a **blank page**.
- The POST response (`x-nextjs-cache: HIT`, `x-nextjs-prerender: 1`) contains only `<script>` tags with the RSC payload (including the action result `{"count":1}`); it has no `<html>`, `<body>` or prerendered markup.

## Expected behavior

With JavaScript disabled, the form should progressively enhance: after submitting, the page should render as full HTML showing `Action ran 1 times`.

## Comparison

With JavaScript enabled, the same form works: the action runs and the UI shows `Action ran 1 times`.

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
