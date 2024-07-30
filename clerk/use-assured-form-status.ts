import { useEffect } from "react";
import { useFormState } from "react-dom";

function assertAssuranceAAA<T extends object, Args extends any>(
  fetcher: (params: Args[]) => Promise<any>
) {
  return async (...args: Args[]) => {
    // @ts-ignore
    let result = (await fetcher(...args)) as T;

    while ("clerk_error" in result && "reason" in result) {
      let creds = prompt("Verify your credentials");

      while (creds == null || creds == "") {
        creds = prompt("Verify your credentials");
      }

      // <UserVerification /> calls FAPI
      await fetch("/fapi/verify", {
        method: "POST",
      });

      // @ts-ignore
      result = await fetcher(...args);
    }

    return result;
  };
}

// @ts-expect-error
const useAssuredFormStatus: typeof useFormState = (...args) => {
  const res = useFormState(assertAssuranceAAA(args[0]), args[1], args[2]);

  // useEffect(() => {
  //   if ("clerk_error" in state && "reason" in state) {
  //     let creds = prompt("Verify your credentials");

  //     while (creds == null || creds == "") {
  //       creds = prompt("Verify your credentials");
  //     }

  //     // <UserVerification /> calls FAPI
  //     fetch("/fapi/verify", {
  //       method: "POST",
  //     }).then(() => {
  //       formAction();
  //     });
  //   }
  // }, [formAction, state]);

  return res;
};

export { useAssuredFormStatus };
