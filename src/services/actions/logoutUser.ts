import {removeUserInfo} from "@/services/auth.services";
import deleteCookies from "@/services/actions/deleteCookies";
import {authKey} from "@/constants/authKey";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

const logoutUser = (router: AppRouterInstance) => {
    removeUserInfo();
    deleteCookies([authKey, "refreshToken"]);
    router.push("/");
    router.refresh();
};

export default logoutUser;