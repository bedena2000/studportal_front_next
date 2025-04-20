"use server";

import { cookies } from "next/headers";

export async function GetCookie(cookieName) {
  try {
    const cookieStore = cookies();
    const userToken = (await cookieStore).get(cookieName);

    return userToken.value;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
