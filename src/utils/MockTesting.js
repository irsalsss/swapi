import client from "../client/ApiClient";

const getFilmsData = async (page) => {
  let url = `https://swapi.dev/api/films/${page}/`
  const { data, status } = await client(url, { method: "GET" })
  return data
}

export { getFilmsData }