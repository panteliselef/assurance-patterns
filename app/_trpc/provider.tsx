"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PropsWithChildren, useState } from "react";
import { trpc } from "./client";
import { httpBatchLink } from "@trpc/react-query";

export function TRPCProvider(props: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
