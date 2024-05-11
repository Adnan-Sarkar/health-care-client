import {authKey} from "@/constants/authKey";
import {TGenericErrorResponse, TResponseSuccessType,} from "@/types/index.types";
import {getFromLocalStoreage, setToLocalStorage} from "@/utils/local-storage";
import axios from "axios";
import {getNewAccessToken} from "@/services/auth.services";

const axiosInstance = axios.create();

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStoreage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  // @ts-ignore
  function (response) {
    const responseObj: TResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };

    return responseObj;
  },
  async function (error) {
      const config = error.config;
      if (error?.response?.status === 500 && !config.sent) {
        config.sent = true;
        const response = await getNewAccessToken();
        const accessToken = response?.data?.access_token
          config.headers["Authorization"] = accessToken;
          setToLocalStorage(authKey, accessToken);

          return axiosInstance(config);
      }
      else {
          const responseObj: TGenericErrorResponse = {
              statusCode: error?.response?.data?.statusCode || 500,
              message: error?.response?.data?.message || "Something went wrong!",
              errorMessages: error?.response?.data?.message,
          };

          return responseObj;
      }
  }
);

export { axiosInstance };
