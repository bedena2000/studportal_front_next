export async function checkIfTokenCorrect(token) {
  const resultOfAuthentification = await fetch("http://localhost:5000/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await resultOfAuthentification.json();

  return result;
}
