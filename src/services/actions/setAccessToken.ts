"use server"

import {cookies} from "next/headers";
import {authKey} from "@/constants/authKey";
import {redirect} from "next/navigation";

type TOptions = {
    redirect: string;
}

const setAccessToken = (token: string, option?: TOptions) => {
    cookies().set(authKey, token);

    if (option?.redirect) {
        redirect(option?.redirect);
    }
}

export default setAccessToken;