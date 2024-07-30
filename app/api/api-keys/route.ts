import { assurance } from "@/clerk/server/assurance";

export const GET = assurance(() => {
  return new Response(JSON.stringify({ data: "authed" }), {
    status: 200,
  });
});

export const POST = assurance(() => {
  return new Response(JSON.stringify({ data: "new-key" }), {
    status: 201,
  });
});
