import { setToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/authKey";

export const storeUserInfo = (token: string) => {
  return setToLocalStorage(authKey, token);
};
