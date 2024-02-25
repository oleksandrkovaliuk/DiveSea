const MAIN_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api`;

async function handleErrors(response) {
  if (!response.ok) {
    const parsedError = await response?.json();
    throw Error(parsedError?.errorText || response.statusText);
  }
  return response;
}
export const workWithAutorization = async ({
  reqType,
  emailValue,
  userName,
  codeFromUser,
  id,
  sendEmail,
}) =>
  fetch(`${MAIN_URL}${reqType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      email: emailValue,
      userName: userName,
      codeFromUser: codeFromUser,
      sendEmail: sendEmail,
    }),
  })
    .then(handleErrors)
    .then((res) => res.json())
    .catch((err) => {
      throw Error(err);
    });
