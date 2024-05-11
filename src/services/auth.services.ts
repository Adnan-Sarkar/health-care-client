import {
  getFromLocalStoreage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";
import { authKey } from "@/constants/authKey";
import { decodedToken } from "@/utils/jwt";
import {axiosInstance} from "@/helpers/axios/axiosInstance";

export const storeUserInfo = (token: string) => {
  return setToLocalStorage(authKey, token);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStoreage(authKey);

  if (authToken) {
    const decodedData: any = decodedToken(authToken);

    return {
      ...decodedData,
      role: decodedData?.role.toLowerCase(),
    };
  }
};

export const removeUserInfo = () => {
  return removeFromLocalStorage(authKey);
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStoreage(authKey);
  if (authToken) {
    return true;
  }

  return false;
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_SERVICE_URL}/auth/refresh-token`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  })
}