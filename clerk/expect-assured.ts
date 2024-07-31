import { AssuredState, DeAssuredState } from "./server/assurance";

function resolveResult(result: Promise<unknown>) {
  return result.then((r) => {
    if (r instanceof Response) {
      return r.json();
    }
    return r;
  });
}

// async function assertAssurance<T extends unknown>(fetcher: () => Promise<T>) {

async function assertAssurance<T extends AssuredState<unknown>>(
  fetcher: () => Promise<T>
): Promise<DeAssuredState<T>> {
  let result = await resolveResult(fetcher());

  //@ts-ignore
  while ("clerk_error" in result && "reason" in result) {
    let creds = prompt(
      `Verify your credentials with method ${(result as any).level}`
    );

    while (creds == null || creds == "") {
      creds = prompt(
        `Verify your credentials with method ${(result as any).level}`
      );
    }

    // <UserVerification /> calls FAPI
    await fetch("/fapi/verify", {
      method: "POST",
    });

    result = (await resolveResult(fetcher())) as T;
  }

  return result as DeAssuredState<T>;
}

// function assertAssuranceHandler<T extends object>(
//   fetcher: () => Promise<Response>
// ) {
//   return async () => {
//     return await assertAssurance<T>(fetcher);
//   };
// }

function assertAssuranceAction<T extends object, Args extends any>(
  fetcher: (...params: Args[]) => Promise<any>
) {
  return async (...args: Args[]) => {
    let result = (await resolveResult(fetcher(...args))) as T;

    while ("clerk_error" in result && "reason" in result) {
      let creds = prompt(
        `Verify your credentials with method ${(result as any).level}`
      );

      while (creds == null || creds == "") {
        creds = prompt(
          `Verify your credentials with method ${(result as any).level}`
        );
      }

      // i think this makes a requirement for client only

      // <UserVerification /> calls FAPI
      await fetch("/fapi/verify", {
        method: "POST",
      });

      result = (await resolveResult(fetcher(...args))) as T;
    }

    return result;
  };
}

export { assertAssurance, assertAssuranceAction };
