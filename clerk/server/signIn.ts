"use server";

import { cookies } from "next/headers";

export async function signIn() {
  cookies().set("clerk_cookie", "pantelis");
}

export async function signOut() {
  cookies().delete("clerk_cookie");
}
