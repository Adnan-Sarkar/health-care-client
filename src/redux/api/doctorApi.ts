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
  }),
});

export const { useCreateDoctorMutation } = doctorApi;
