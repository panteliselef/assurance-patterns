import { waitFor } from "@/app/waitFor";
import { assurance } from "@/clerk/server/assurance";

const assuranceSettings = {
  level: "L1",
  maxAge: "1d",
} as const;

export const GET = assurance(async () => {
  await waitFor();
  return new Response(JSON.stringify({ data: "authed" }), {
    status: 200,
  });
}, assuranceSettings);

export const POST = assurance(async () => {
  await waitFor();
  return new Response(JSON.stringify({ data: "new-key" }), {
    status: 201,
  });
}, assuranceSettings);
