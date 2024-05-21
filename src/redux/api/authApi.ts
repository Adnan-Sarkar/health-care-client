import {baseApi} from "@/redux/api/baseApi";
import {tagTypes} from "@/redux/tag-types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        changePassword: builder.mutation({
            query: (data) => ({
                url: `/auth/change-password`,
                method: 'POST',
                contentType: 'application/json',
                data: data,
            }),
            invalidatesTags: [tagTypes.user],
        }),
    }),
});

export const {
    useChangePasswordMutation,
} = authApi;