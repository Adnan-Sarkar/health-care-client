import { TDoctor, TMeta } from "@/types/index.types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctor: builder.mutation({
      query: (data) => ({
        url: `/user/create-doctor`,
        method: "POST",
        contentType: "multipart/Form-data",
        data,
      }),
      invalidatesTags: [tagTypes.doctor],
    }),

    getAllDoctors: builder.query({
      query: (args: Record<string, any>) => ({
        url: `/doctor`,
        method: "GET",
        params: args,
      }),
      transformResponse: (response: TDoctor[], meta: TMeta) => {
        return {
          doctors: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctor],
    }),
  }),
});

export const { useCreateDoctorMutation, useGetAllDoctorsQuery } = doctorApi;
