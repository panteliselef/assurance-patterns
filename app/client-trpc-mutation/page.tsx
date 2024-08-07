"use client";

import { assertAssuranceAction } from "@/clerk/expect-assured";
import { trpc } from "../_trpc/client";

export default function ClientPage() {
  const { mutateAsync } = trpc.createAPIKey.useMutation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={assertAssuranceAction(() => mutateAsync())}>
        Create a key (2)
      </button>
    </main>
  );
}
