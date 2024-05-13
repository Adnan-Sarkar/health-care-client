import {baseApi} from "@/redux/api/baseApi";
import {tagTypes} from "@/redux/tag-types";

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
    }),
});

export const {useCreateDoctorScheduleMutation} = doctorScheduleApi