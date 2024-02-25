const MAIN_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api`;

async function handleErrors(response) {
  if (!response.ok) {
    const parsedError = await response?.json();
    throw Error(parsedError?.errorText || response.statusText);
  }
  return response;
}

const headers = {
  "Content-Type": "application/json",
};

export const postRequest = async (url, data = {}) =>
  fetch(`${MAIN_URL}/${url}`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(data),
  })
    .then(handleErrors)
    .then((res) => res.json())
    .catch((err) => {
      throw Error(err);
    });

export const getRequest = async (url) =>
  fetch(`${MAIN_URL}/${url}`, {
    method: "GET",
  })
    .then(handleErrors)
    .then((res) => res.json())
    .catch((err) => {
      throw Error(err);
    });

export const loginUser = async ({ sendEmail, email }) =>
  postRequest("loginUser", { sendEmail, email });

export const getItems = async ({ param1, param2 }) => {
  const searchParams = new URLSearchParams();

  if (param1) {
    searchParams.append("param1", param1);
  }

  if (param2) {
    searchParams.append("param2", param2);
  }

  return getRequest(`getitems?${searchParams.toString()}`);
};

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
      ...headers,
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
