const MAIN_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api`;

function handleErrors(response) {
  console.log(response, ' response');
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const loginUser = ({ emailValue }) =>
  fetch(`${MAIN_URL}/loginUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailValue,
    }),
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
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      console.log(response, " response");
      throw new Error("Something went wrong");
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
};
