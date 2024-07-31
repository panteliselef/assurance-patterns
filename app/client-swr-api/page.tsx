"use client";

import { assertAssurance } from "@/clerk/expect-assured";
import useSWRMutation from "swr/mutation";

export default function ClientPage() {
  // A useSWR + mutate like API, but it will not start the request automatically.
  const { trigger: createKey } = useSWRMutation("/api/api-keys", (key) =>
    assertAssurance(() =>
      fetch(key, {
        method: "POST",
      })
    )
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => {
          createKey();
        }}
      >
        Update User
      </button>
    </main>
  );
}
