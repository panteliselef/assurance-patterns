import { signIn } from "@/clerk/server/signIn";

export const POST = () => {
  signIn();
  return new Response();
};
