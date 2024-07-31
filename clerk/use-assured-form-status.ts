import { useFormState } from "react-dom";
import { assertAssuranceAction } from "./expect-assured";

// function resolveResult(result: Promise<unknown>) {
//   return result.catch((err) => {
//     if ("assuranceError" in err || err instanceof AsssuranceError) {
//       console.log("is errr", err);
//       return {
//         clerk_error: "forbidden",
//         reason: "assurance",
//       };
//     }
//   });
// }

// TODO: Does this break useFormStatus ?
// @ts-expect-error
const useAssuredFormStatus: typeof useFormState = (...args) => {
  const res = useFormState(assertAssuranceAction(args[0]), args[1], args[2]);

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
