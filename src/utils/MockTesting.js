import axios from "axios";
import client from "../client/ApiClient";

const getDataForTesting = async (url) => {
  const { data, status } = await client(url, { method: "GET" })
  return data
}

const getData = async(url) => {
  return axios.get(url)
}

export { getDataForTesting, getData }