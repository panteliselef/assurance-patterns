"use client";

import { createApiKey } from "../actions/createApiKey";
export function UserProfile() {
  // This case to not be possible,
  // Maybe we still need `auth().protect()` here

  return (
    <form action={createApiKey}>
      <input type="text" name="name" />
      <button type="submit">Update User Name</button>
    </form>
  );
}
