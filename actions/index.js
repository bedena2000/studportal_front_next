"use server";

import { api } from "@/lib/fetching";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function RegisterUser(prevState, formData) {
  try {
    const username = formData.get("username");
    const password = formData.get("password");

    console.log(prevState);

    const errors = [];

    if (!username || !password) {
      errors.push("სახელი ან პაროლი აუცილებელია");
    }

    if (username.length < 4) {
      errors.push("სახელი უნდა შედგებოდეს მინიმუმ 4 სიმბოლოსაგან");
    }

    if (username.length > 28) {
      errors.push("სახელი უნდა შედგებოდეს არაუმეტეს 28 სიმბოლოსაგან");
    }

    if (password.length < 4) {
      errors.push("პაროლი უნდა შედგებოდეს მინიმუმ 4 სიმბოლოსაგან");
    }

    if (errors.length > 0) {
      return {
        errors: errors,
        values: {
          username,
        },
      };
    }

    const data = {
      username,
      password,
    };

    const response = await api.post("/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: (status) =>
        status === 200 || status === 201 || status === 400,
    });

    if (response.status === 400) {
      return {
        errors: ["მომხმარებელი ესეთი სახელით უკვე არსებობს"],
      };
    }

    if (response.status === 201) {
      const token = response.data.token;
      const cookieStore = await cookies();
      cookieStore.set("token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return {
        success: true,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "erorr",
    };
  }
}

export async function LoginUser(prevState, formData) {
  try {
    const username = formData.get("username");
    const password = formData.get("password");

    const errors = [];

    if (!username || !password) {
      errors.push("სახელი და პაროლი აუცილებელია");
    }

    if (errors.length > 0) {
      return {
        errors,
      };
    }

    const data = {
      username,
      password,
    };

    const response = await api.post("/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: (status) =>
        status === 200 || status === 201 || status === 400,
    });

    if (response.status === 200) {
      const token = response.data.token;
      const cookieStore = await cookies();
      cookieStore.set("token", token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return {
        success: true,
        username: response.data.username,
      };
    }
  } catch (error) {
    return {
      errors: [
        "მომხარებლის ნახვა მოცემული სახელით ვერ მოხერხდა, ან ხარვეზია სერვერზე",
      ],
    };
  }
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.set("token", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 0,
  });

  redirect("/login");
}
