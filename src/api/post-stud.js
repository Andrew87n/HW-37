export const postStud = (studData) => {
  const options = {
    method: "POST",
    body: JSON.stringify(studData),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  return fetch("https://6a0f54171736097c360b7f0b.mockapi.io/students", options).then((res) => res.json());
};
