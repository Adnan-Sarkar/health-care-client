import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL as string,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
