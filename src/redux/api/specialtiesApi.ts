import { baseApi } from "./baseApi";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSpeciality: builder.mutation({
      query: (data) => ({
        url: `/specialties`,
        method: "POST",
        contentType: "multipart/Form-data",
        data,
      }),
    }),
  }),
});

export const { useCreateSpecialityMutation } = specialtiesApi;
