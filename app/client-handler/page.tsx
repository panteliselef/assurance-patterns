"use client";

import { assertAssuranceHandler } from "@/clerk/expect-assured";

export default function ClientPage() {
  const createKeyFetcher = () =>
    fetch("/api/api-keys", {
      method: "GET",
    });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={assertAssuranceHandler(createKeyFetcher)}>
        Create a key
      </button>
    </main>
  );
}
