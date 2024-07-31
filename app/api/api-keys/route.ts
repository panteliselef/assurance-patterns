import { waitFor } from "@/app/waitFor";
import { assurance } from "@/clerk/server/assurance";

export const GET = assurance(async () => {
  await waitFor();
  return new Response(JSON.stringify({ data: "authed" }), {
    status: 200,
  });
});

export const POST = assurance(async () => {
  await waitFor();
  return new Response(JSON.stringify({ data: "new-key" }), {
    status: 201,
  });
});
