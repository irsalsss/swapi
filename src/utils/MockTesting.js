import axios from "axios";
import client from "../client/ApiClient";

const getDataForTesting = async (url) => {
  const { data, status } = await client(url, { method: "GET" })
  return data
}

const getData = (url) => {
  return axios.get(url)
  .then(res => res.data)
  .catch(err => err.response)
}

export { getDataForTesting, getData }