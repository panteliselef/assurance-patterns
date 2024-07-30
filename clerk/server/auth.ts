import { cookies } from "next/headers";

export function auth() {
  return cookies().get("clerk_cookie")?.value;
}
