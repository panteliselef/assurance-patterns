"use client";

import { assertAssurance } from "@/clerk/expect-assured";
import { useEffect } from "react";

export default function ClientPage() {
  const createKey = async () => {
    await assertAssurance(() =>
      fetch("/api/api-keys", {
        method: "GET",
      })
    );
  };

  useEffect(() => {
    void createKey();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Wait for fetching</h2>
    </main>
  );
}
