export const delStud = (id) => {
  const options = {
    method: "DELETE",
  };
  return fetch(`https://6a0f54171736097c360b7f0b.mockapi.io/students/${id}`, options).then((res) => res.json());
};