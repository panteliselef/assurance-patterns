import { waitFor } from "@/app/waitFor";
import { cookies } from "next/headers";
import { AsssuranceError } from "../assurance-error";
import { notFound } from "next/navigation";

export const isFunction = <
  T extends (...args: any[]) => any = (...args: any[]) => any
>(
  v: unknown
): v is T => typeof v == "function";
export const isPromiseLike = (x: unknown): x is PromiseLike<unknown> =>
  isFunction((x as any).then);

function assurance(handler: (req: Request) => Promise<Response>) {
  return async (req: Request): Promise<Response> => {
    if (cookies().has("clerk_cookie")) {
      // const h = handler(req);

      // if (isPromiseLike(h)) {
      //   return await h;
      // }
      return handler(req);
    }

    return new Response(
      JSON.stringify({
        clerk_error: "forbidden",
        reason: "assurance",
      }),
      {
        status: 403,
      }
    );
  };
}

type AssuredState<T> =
  | T
  | {
      clerk_error: "forbidden";
      reason: "assurance";
    };

type DeAssuredState<T> = Exclude<
  T,
  {
    clerk_error: "forbidden";
    reason: "assurance";
  }
>;

function assuranceAction<Params extends any[], ReturnValue extends any>(
  handler: (...args: Params) => ReturnValue
) {
  return async (...args: Params): Promise<AssuredState<ReturnValue>> => {
    await waitFor();

    if (cookies().has("clerk_cookie")) {
      return handler(...args);
    }

    // 1️⃣
    // Maybe forbidden couuld come in handy
    // Example forbidden({clerk_reason: 'assurance:10m:secondFactor'})
    // but rip 🥴
    // What this unlocks for server actions is status codes, otherwise we are stuck with 200 or 500 😩
    // return notFound();

    // 2️⃣
    // Maybe promise but i don't see why
    // Seems like the error is getting sanitized and we are only left with a {digest:xxxx}
    // return Promise.reject({
    //   clerk_error: "forbidden",
    //   reason: "assurance",
    // });

    // 3️⃣
    // Seems like the error is getting sanitized and we are only left with a {digest:xxxx}
    // throw new AsssuranceError("lol", {
    //   code: "assurance",
    // });

    // 4️⃣
    // Returning makes difficult to bubble up the error
    return {
      clerk_error: "forbidden",
      reason: "assurance",
    };
  };
}

async function deAssuranceAction<Result>(
  handler: Promise<AssuredState<Result>>
): Promise<DeAssuredState<Result>> {
  const result = (await handler) as any;

  if ("clerk_error" in result && "reason" in result) {
    // Assertiion, we don't need to catch this one
    throw new Error(
      "Make sure to wrap your server action with `assuranceAction`"
    );
  }

  return result;
}

export type { AssuredState, DeAssuredState };

export { assurance, assuranceAction, deAssuranceAction };
