import Link from "next/link";

const bugs = [
  { href: "/bug-1-blank-page", title: "Bug 1: no-JS server action returns a blank page", mode: "npm run build && npm run start" },
  { href: "/bug-2-cookies-error", title: "Bug 2: cookies() InvariantError after a no-JS action", mode: "npm run dev" },
  { href: "/bug-4-stale-export", title: "Bug 4: new export is undefined until next dev restarts", mode: "npm run dev" },
];

export default function Home() {
  return (
    <main className="flex flex-col gap-6 p-10">
      <h1 className="text-2xl font-bold">Next.js reproductions</h1>
      <p>Each page reproduces one bug. See README.md for the exact steps.</p>
      <ul className="flex flex-col gap-3">
        {bugs.map((b) => (
          <li key={b.href}>
            <Link href={b.href} className="underline">
              {b.title}
            </Link>{" "}
            <code className="text-sm">({b.mode})</code>
          </li>
        ))}
      </ul>
    </main>
  );
}
