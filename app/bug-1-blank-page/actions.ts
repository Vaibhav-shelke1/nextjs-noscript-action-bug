"use server";

export async function save(prev: { count: number }, data: FormData) {
  // If this line is not printed in the server terminal, the action did not run.
  console.log("ACTION RAN:", data.get("name"));
  return { count: prev.count + 1 };
}
