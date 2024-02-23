const MAIN_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api`;

async function handleErrors(response) {
  if (!response.ok) {
    const parsedError = await response?.json();
    throw Error(parsedError?.errorText || response.statusText);
  }
  return response;
}

export const loginUser = async ({ emailValue }) =>
  fetch(`${MAIN_URL}/loginUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
      sendEmail: true,
    }),
  })
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });

export const signInUser = async ({ emailValue, userName }) => {
  fetch(`${MAIN_URL}/signInUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
      userName: userName,
    }),
  })
    .then(handleErrors)
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
};
