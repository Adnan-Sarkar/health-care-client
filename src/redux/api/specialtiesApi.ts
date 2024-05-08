import { tagTypes } from "../tag-types";
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
      invalidatesTags: [tagTypes.specialties],
    }),

    getAllSpecialties: builder.query({
      query: () => ({
        url: `/specialties`,
        method: "GET",
      }),
      providesTags: [tagTypes.specialties],
    }),

    deleteSpeciality: builder.mutation({
      query: (id) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
  }),
});

export const {
  useCreateSpecialityMutation,
  useGetAllSpecialtiesQuery,
  useDeleteSpecialityMutation,
} = specialtiesApi;
