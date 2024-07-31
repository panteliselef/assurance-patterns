"use client";

import { createApiKeyWithState } from "../actions/createApiKey";
import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";
import { assertAssuranceAction } from "@/clerk/expect-assured";

const initialState = {
  key: "",
};

export default function ClientFormState() {
  // TODO: Does this break useFormStatus ?
  // const [state, formAction] = useAssuredFormStatus(
  //   createApiKeyWithState,
  //   initialState
  // );

  const [state, formAction] = useFormState(
    assertAssuranceAction(createApiKeyWithState),
    initialState
  );

  return (
    <form action={formAction}>
      <input type="text" id="key" name="key" required />

      <h1>HEEY</h1>
      {/* TODO: fix the type */}
      <p>{state.key}</p>
      <SubmitButton />
    </form>
  );
}
