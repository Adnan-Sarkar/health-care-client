import {TDoctor, TMeta} from "@/types/index.types";
import {tagTypes} from "../tag-types";
import {baseApi} from "./baseApi";

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

        getSingleDoctor: builder.query({
            query: (id: string) => ({
                url: `/doctor/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.doctor],
        }),

        updateDoctor: builder.mutation({
            query: (data) => ({
                url: `/doctor/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.doctor, tagTypes.user],
        }),

        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `/doctor/soft/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.doctor],
        }),
    }),
});

export const {
    useCreateDoctorMutation,
    useGetAllDoctorsQuery,
    useGetSingleDoctorQuery,
    useUpdateDoctorMutation,
    useDeleteDoctorMutation,
} = doctorApi;
