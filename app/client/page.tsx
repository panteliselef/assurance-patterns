"use client";

import { assertAssurance } from "@/clerk/expect-assured";

export default function ClientPage() {
  const createKey = async () => {
    await assertAssurance(() =>
      fetch("/api/api-keys", {
        method: "GET",
      })
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={createKey}>Create a key (2)</button>
    </main>
  );
}
