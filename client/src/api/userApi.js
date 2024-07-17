import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const staggeredBaseQuery = async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
        baseUrl: "http://localhost:8000/",
    })(args, api, extraOptions);

    return result;
};

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: staggeredBaseQuery,
    keepUnusedDataFor: 360,
    tagTypes: [],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => {
                return {
                    url: `/user/create`,
                    method: "POST",
                    body: body,
                };
            },
        }),
        login: builder.mutation({
            query: (body) => {
                return {
                    url: `/user/login`,
                    method: "POST",
                    body: body,
                };
            },
        }),
        logout: builder.mutation({
            query: () => {
                return {
                    url: `/logout`,
                    method: "POST",
                };
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation,useLogoutMutation } = userApi;
// 