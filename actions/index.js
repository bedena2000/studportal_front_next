"use server";

import { api } from "@/lib/fetching";

export async function Test() {
  await api
    .get("/test")
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
