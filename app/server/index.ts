import crypto from "crypto";
import { publicProcedure, router } from "./trpc";
import { assuranceAction } from "@/clerk/server/assurance";

export const appRouter = router({
  getAPIKeys: publicProcedure.query(() => {
    return ["sk_1221bday21", "sk_1287767dada"];
  }),

  createAPIKey: publicProcedure.mutation(
    assuranceAction(
      () => {
        // throw new TRPCError({
        //   code: 'FORBIDDEN',
        //   message: 'An unexpected error occurred, please try again later.',
        //   // optional: pass the original error to retain stack trace
        //   cause: new Error("assurance:secondFactor"),
        // })
        return {
          key: crypto.randomBytes(8).toString("hex"),
        };
      },
      {
        level: "L1",
        maxAge: "1h",
      }
    )
  ),
});

export type AppRouter = typeof appRouter;
