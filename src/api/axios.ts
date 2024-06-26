import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

const customAxios = (() =>
  axios.create({
    baseURL: "/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  }))();

customAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config as AxiosRequestConfig;
      if (originalRequest) {
        try {
          return customAxios.request(originalRequest);
        } catch (retryError: any) {
          return Promise.reject(retryError);
        }
      }
    }
    return Promise.reject(error);
  },
);

export const fetchData = async <ResponseType, RequestType = undefined>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  data?: RequestType,
): Promise<ResponseType> => {
  try {
    let response: AxiosResponse<ResponseType>;
    switch (method) {
      case "GET":
        response = await customAxios.get(endpoint);
        break;
      case "POST":
        response = await customAxios.post<ResponseType>(endpoint, data);
        break;
      case "PUT":
        response = await customAxios.put<ResponseType>(endpoint, data);
        break;
      case "DELETE":
        response = await customAxios.delete<ResponseType>(endpoint);
        break;
      default:
        throw new Error("Invalid HTTP method");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "An unknown error occurred");
  }
};
