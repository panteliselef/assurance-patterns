"use client";
import { assertAssuranceAction } from "@/clerk/expect-assured";
import { createApiKey, actionInsideAnAction } from "../actions/createApiKey";

export default function ClientForm() {
  return (
    <form
      // Simple Action
      // action={assertAssuranceAction(createApiKey)}
      // Action inside an Action
      action={assertAssuranceAction(actionInsideAnAction)}
      className={"flex flex-col"}
    >
      <input type="text" name="name" />
      <button type="submit">Update User Name</button>
    </form>
  );
}
