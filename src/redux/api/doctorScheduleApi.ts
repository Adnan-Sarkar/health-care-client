import {baseApi} from "@/redux/api/baseApi";
import {tagTypes} from "@/redux/tag-types";
import {TMeta} from "@/types/index.types";

export const doctorScheduleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createDoctorSchedule: builder.mutation({
            query: (data) => ({
                url: '/doctor-schedule',
                method: 'POST',
                data,
            }),
            invalidatesTags: [tagTypes.doctorSchedule],
        }),

        getAllDoctorSchedules: builder.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: '/doctor-schedule',
                    method: 'GET',
                    params: arg,
                };
            },
            transformResponse: (response: [], meta: TMeta) => {
                return {
                    doctorSchedules: response,
                    meta,
                };
            },
            providesTags: [tagTypes.doctorSchedule],
        }),

        getDoctorSchedule: builder.query({
            query: (id: string | string[] | undefined) => ({
                url: `/doctor-schedule/${id}`,
                method: 'GET',
            }),
            providesTags: [tagTypes.doctorSchedule],
        }),

        getMySchedule: builder.query({
            query: () => ({
                url: '/doctor-schedule/my-schedules',
                method: 'GET',
            }),
            providesTags: [tagTypes.doctorSchedule],
        }),
    }),
});

export const {
    useCreateDoctorScheduleMutation,
    useGetAllDoctorSchedulesQuery,
    useGetDoctorScheduleQuery,
    useGetMyScheduleQuery
} = doctorScheduleApi