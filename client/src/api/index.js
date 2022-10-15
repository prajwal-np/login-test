import axios from "axios";
const instance = axios.create({
  baseURL: `http://localhost:4000`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const get = async (uri, params) => {
  return await instance.get(
    uri,
    params ? { ...params, crossdomain: true } : { crossdomain: true }
  );
};

export const post = async (uri, data, params) => {
  return await instance.post(
    uri,
    data,
    params ? { ...params, crossdomain: true } : { crossdomain: true }
  );
};
