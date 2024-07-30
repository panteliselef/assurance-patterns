"use client";

import { createApiKeyWithState } from "../actions/createApiKey";
import { useAssuredFormStatus } from "@/clerk/use-assured-form-status";

const initialState = {
  key: "",
};

export default function ClientFormState() {
  const [state, formAction] = useAssuredFormStatus(
    createApiKeyWithState,
    initialState
  );

  console.log("dsasdaw", state);

  return (
    <form action={formAction}>
      <input type="text" id="key" name="key" required />

      <h1>HEEY</h1>
      <p>{state.key}</p>
      <button>Create Key</button>
    </form>
  );
}
