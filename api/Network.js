import axios from "axios";
import { getData } from "../src/hooks/asynStorageHooks";

const base_url = "http://3.93.64.231:3000/";

export const Network = async (
  method,
  endpoint,
  data = {},
  isAuthRoute = false
) => {
  try {
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (!isAuthRoute) {
      const accessToken = await getData("accessToken");

      if (accessToken) {
        headers["x-access-dealer-token"] = `Bearer ${accessToken}`;
      }
    }

    // Switch to multipart if we have FormData
    if (data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    // console.log({ method, headers, url: `${base_url}${endpoint}`, data });

    const response = await axios({
      method,
      headers,
      url: `${base_url}${endpoint}`,
      data,
    });

    return response.data;
  } catch (error) {
    console.error("Network error:", error);

    // Handle different error response formats
    let errorData;
    try {
      errorData = error.response?.data ||
        JSON.parse(error.response?.request?._response) || {
          message: error.message,
        };
    } catch (e) {
      console.log(e);
      errorData = { message: "Network request failed" };
    }

    throw errorData;
  }
};
