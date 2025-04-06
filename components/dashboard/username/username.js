"use client";

import { useEffect, useState } from "react";

export default function Username() {
  const [username, setUsername] = useState();

  useEffect(() => {
    const cookies = document.cookie;
    const cookieArray = cookies.split("; ");

    const usernameCookie = cookieArray.find((cookie) =>
      cookie.startsWith("username=")
    );

    if (usernameCookie) {
      const usernameValue = usernameCookie.split("=")[1];
      setUsername(usernameValue);
    }
  }, []);

  return <p>გამარჯობა: {username || "სტუმარი"}</p>;
}
