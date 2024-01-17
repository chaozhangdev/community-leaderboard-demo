/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const get = async (keyword: string) => {
  try {
    const res = await axios.get(`http://localhost:8080/${keyword}`);
    if (res.status === 200) {
      return res;
    }
  } catch (error: any) {
    console.error(error);
  }
};

const post = async (keyword: string, payload: any) => {
  try {
    const res = await axios.post(`http://localhost:8080/${keyword}`, payload);
    if (res.status === 200) {
      return res;
    }
  } catch (error: any) {
    console.error(error);
  }
};

export { get, post };
