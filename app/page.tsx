import { connection } from "next/server";
import { Suspense } from "react";
import Form from "./form";

async function Dynamic() {
  // Request-time data, so this route is partially prerendered (static shell + dynamic hole).
  await connection();
  return <p>Dynamic part rendered at {new Date().toISOString()}</p>;
}

export default function Home() {
  return (
    <main className="flex flex-col gap-6 p-10">
      <h1 className="text-2xl font-bold">No-JS server action repro</h1>
      <Suspense fallback={<p>Loading…</p>}>
        <Dynamic />
      </Suspense>
      <Form />
    </main>
  );
}
