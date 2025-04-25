"use server";

import { api } from "@/lib/fetching";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
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

// Logout

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

// Create a group

export async function createGroup(prevState, formData) {
  try {
    const groupName = formData.get("group_name");
    const groupDescription = formData.get("group_description");

    const errors = [];

    if (!groupName || !groupDescription) {
      errors.push("სახელი და აღწერა აუცილებელია");
    }

    if (groupName.length < 4) {
      errors.push("ჯგუფის სახელი უნდა შეიცავდეს მინიმუმ 4 სიმბოლოს");
    }

    if (groupDescription.length < 4) {
      errors.push("ჯგუფის აღწერა უნდა შეიცავდეს მინიმუმ 4 სიმბოლოს");
    }

    if (errors.length > 0) {
      return {
        errors,
      };
    }

    // Creating a group
    const cookieStore = cookies();
    const userToken = (await cookieStore).get("token");

    if (!userToken) {
      return {
        errors: ["დაფიქსირდა შეცდომა, გთხოვთ სცადეთ ხელახლა"],
      };
    }

    const token = userToken.value;

    const data = {
      groupName: groupName,
      groupDescription: groupDescription,
      userToken: token,
    };

    const newGroup = await api.post("/groups/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (newGroup.status === 200) {
      return {
        message: "success",
        group: newGroup.data,
      };
    }

    return {
      errors: ["დაფიქსირდა შეცდომა, გთხოვთ სცადეთ ხელახლა"],
    };
  } catch (error) {
    console.log(error);
    return {
      errors: ["დაფიქსირდა შეცდომა, გთხოვთ სცადეთ ხელახლა"],
    };
  }
}

// Get all groups

export async function getAllGroups() {
  const groups = await api.get("/groups/all");
  return groups.data;
}

// Get all groups that belong the user

export async function getUsersGroups() {
  const cookieStore = cookies();
  const userToken = (await cookieStore).get("token");

  if (!userToken) {
    throw new Error("Something went wrong");
  }

  const groups = await api.get("groups/user_groups", {
    headers: {
      Authorization: `Bearer ${userToken.value}`,
    },
  });

  if (!groups.message === "success") {
    throw new Error("Something went wrong");
  }

  return groups.data.groups;
}

// Get group detail

export async function getGroupDetail(groupId) {
  const cookieStore = cookies();
  const userToken = (await cookieStore).get("token");

  if (!userToken) {
    throw new Error("Something went wrong");
  }

  try {
    const result = await api.get(`groups/group_detail?groupId=${groupId}`, {
      headers: {
        Authorization: `Bearer ${userToken.value}`,
      },
    });
    return result.data;
  } catch (error) {
    if (error.response?.status === 403) {
      return error.response.data;
    }
    throw error;
  }
}

// Sent request for joining in group

export async function joinGroup(groupId) {}

// Check if user is group admin

// export async function IsAdmin(groupId) {
//   const cookieStore = cookies();
//   const userToken = (await cookieStore).get("token");

//   if (!userToken) {
//     throw new Error("Something went wrong");
//   }

// }

// Get all group messages
export async function getAllGroupMessages(groupId) {
  const cookieStore = cookies();
  const userToken = (await cookieStore).get("token");

  if (!userToken) {
    throw new Error("Something went wrong");
  }

  try {
    const result = await api.get(`/messages/all?groupId=${groupId}`, {
      headers: {
        Authorization: `Bearer ${userToken.value}`,
      },
    });

    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Send new message
export async function sendNewMessage(prevState, formData) {
  const message = formData.get("messageContent");
  const groupId = Number(formData.get("groupId"));

  const errorList = [];

  const cookieStore = cookies();
  const userToken = (await cookieStore).get("token");

  if (!userToken) {
    errorList.push("მესიჯი ვერ იქნება ცარიელი");
  }

  if (message.trim().length === 0) {
    errorList.push("მესიჯი ვერ იქნება ცარიელი");
  }

  if (errorList.length > 0) {
    return {
      error: errorList,
    };
  }

  try {
    const result = await api.post(
      `/messages/new?groupId=${groupId}`,
      {
        content: message,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken.value}`,
        },
      }
    );

    return {
      data: result.data,
      error: [],
      success: true,
    };
  } catch (error) {
    errorList.push("დაფიქსირდა შეცდომა, გთხოვთ სცადეთ ხელახლა");
    console.error(error);
    return {
      error: errorList,
    };
  }
}

// Send an image
export async function SendImage(prevState, formData) {
  const uploadedFile = formData.get("uploadedFile");
  const groupId = Number(formData.get("groupId"));

  const cookieStore = cookies();
  const userToken = (await cookieStore).get("token");

  const errorList = [];

  if (!uploadedFile || !groupId) {
    errorList.push("დაფიქსირდა შეცდომა");
  }

  if (!userToken) {
    errorList.push("მესიჯი ვერ იქნება ცარიელი");
  }

  if (errorList.length > 0) {
    return {
      error: errorList,
    };
  }

  try {
    const data = new FormData();
    data.append("file", uploadedFile);

    console.log("uploading");

    const result = await api.post(`/files/upload?groupId=${groupId}`, data, {
      headers: {
        Authorization: `Bearer ${userToken.value}`,
      },
    });

    console.log(result);

    return {
      success: true,
      file: result.data.file,
    };
  } catch (error) {
    console.error(error);
    return {
      error: errorList,
    };
  }
}

export async function gellAllGroupsFiles(groupId) {
  const cookieStore = cookies();
  const userToken = (await cookieStore).get("token");

  if (!userToken) {
    throw new Error("Authentication token not found");
  }

  try {
    const result = await api.get(`/files/all?groupId=${groupId}`, {
      headers: {
        Authorization: `Bearer ${userToken.value}`,
      },
    });

    return result.data;
  } catch (error) {
    console.error("Failed to fetch files:", error);
    return [];
  }
}

// Send joining request
export async function sendJoiningRequest(groupId) {
  const cookieStore = cookies();
  const userToken = (await cookieStore).get("token");

  const errors = [];

  if (!userToken) {
    errors.push("You have not provided token");
  }

  if (errors.length > 0) {
    return {
      errors,
    };
  }

  try {
    const request = await api.post(
      `/groups/send_join_request?groupId=${Number(groupId)}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${userToken.value}`,
        },
      }
    );

    console.log(request.data);
    return {
      data: request.data,
    };
  } catch (error) {
    console.error(error);
    return {
      errors,
    };
  }
}
