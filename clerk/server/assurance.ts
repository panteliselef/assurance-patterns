import { cookies } from "next/headers";

function assurance(handler: (req: Request) => Response) {
  return (req: Request): Response => {
    if (cookies().has("clerk_cookie")) {
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

function assuranceAction<Params extends any[], ReturnValue extends any>(
  handler: (...args: Params) => ReturnValue
) {
  return async (...args: Params): Promise<AssuredState<ReturnValue>> => {
    if (cookies().has("clerk_cookie")) {
      return handler(...args);
    }

    return {
      clerk_error: "forbidden",
      reason: "assurance",
    };
  };
}

export type { AssuredState };

export { assurance, assuranceAction };
