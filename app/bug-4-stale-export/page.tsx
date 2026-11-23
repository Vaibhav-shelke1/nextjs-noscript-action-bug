import { STYLE_A } from "@/lib/shared";

export default function BugFourPage() {
  return (
    <main className="flex flex-col gap-6 p-10">
      <h1 className="text-2xl font-bold">Bug 4: new export is undefined until next dev restarts</h1>
      <p>STYLE_A.new = {STYLE_A.new}</p>
      <p>Follow the README steps to add STYLE_B and the /bug-4-stale-export/two page while the dev server is running.</p>
    </main>
  );
}
