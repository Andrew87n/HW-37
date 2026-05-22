export const getStud = () => {
  return fetch("https://6a0f54171736097c360b7f0b.mockapi.io/students").then((res) => res.json());
};