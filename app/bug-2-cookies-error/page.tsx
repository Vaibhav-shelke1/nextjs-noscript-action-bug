import { cookies } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";
import Form from "./form";

async function Dynamic() {
  // Request-time data that reads cookies(), inside a Suspense boundary.
  await connection();
  const store = await cookies();
  return <p>Dynamic part, cookies found: {store.getAll().length}</p>;
}

export default function BugTwoPage() {
  return (
    <main className="flex flex-col gap-6 p-10">
      <h1 className="text-2xl font-bold">Bug 2: cookies() InvariantError after a no-JS action</h1>
      <Suspense fallback={<p>Loading…</p>}>
        <Dynamic />
      </Suspense>
      <Form />
    </main>
  );
}
