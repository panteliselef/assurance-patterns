import { appRouter } from "@/app/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
    // onError({ error }) {
    //   console.log("dwadada", error);
    //   if (error.code === "INTERNAL_SERVER_ERROR") {
    //     console.error("Caught TRPC error:", error);
    //   }
    // },
  });

export { handler as GET, handler as POST };
