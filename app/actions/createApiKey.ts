"use server";

import crypto from "crypto";
import { assuranceAction, deAssuranceAction } from "@/clerk/server/assurance";

const assuranceSettings = {
  level: "L1",
  maxAge: "1d",
} as const;

async function dummyAction(formData: FormData) {
  return {
    data: formData.get("name"),
  };
}

const createRandomApiKey = assuranceAction((prefix: string) => {
  return {
    key: prefix + crypto.randomBytes(8).toString("hex"),
  };
}, assuranceSettings);

const createApiKey = assuranceAction((formData: FormData) => {
  return {
    key: formData.get("name"),
  };
}, assuranceSettings);

const actionInsideAnAction = assuranceAction(async (formData: FormData) => {
  const actionResult = await deAssuranceAction(createApiKey(formData));
  console.log("action result", actionResult);
  return actionResult;
}, assuranceSettings);

const createApiKeyWithState = assuranceAction(
  (prevState: any, formData: FormData) => {
    return {
      key: formData.get("key"),
    };
  },
  assuranceSettings
);

export {
  createApiKey,
  createApiKeyWithState,
  dummyAction,
  actionInsideAnAction,
  createRandomApiKey,
};
