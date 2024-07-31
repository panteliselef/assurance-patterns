"use client";

import { assertAssurance, assertAssuranceAction } from "@/clerk/expect-assured";
import useSWRMutation from "swr/mutation";
import { createRandomApiKey } from "../actions/createApiKey";

export default function ClientPage() {
  const {
    trigger: createKey,
    data,
    isMutating,
  } = useSWRMutation("/api/api-keys", (url, { arg }: { arg: string }) =>
    // assertAssuranceAction(() => createRandomApiKey(arg))
    assertAssurance(() => createRandomApiKey(arg))
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {data?.key}
      <button disabled={isMutating} onClick={() => createKey("11111")}>
        Update User {isMutating && "Sending..."}
      </button>
    </main>
  );
}
