"use client";

import { useActionState } from "react";
import { save } from "./actions";

export default function Form() {
  const [state, action] = useActionState(save, { count: 0 });

  return (
    <form action={action} className="flex flex-col gap-3">
      <input name="name" defaultValue="test" className="border px-3 py-2" />
      <button type="submit" className="border px-3 py-2">
        Submit
      </button>
      <p>Action ran {state.count} times</p>
    </form>
  );
}
