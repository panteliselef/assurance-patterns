"use server";

import { assuranceAction } from "@/clerk/server/assurance";

const createApiKey = assuranceAction((key: string) => {
  return {
    key,
  };
});

const createApiKeyWithState = assuranceAction(
  (prevState: any, formData: FormData) => {
    return {
      key: formData.get("key"),
    };
  }
);

export { createApiKey, createApiKeyWithState };
