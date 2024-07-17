import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/cart',
        prepareHeaders: headers => {
            const token = window.sessionStorage.getItem('JWT');
            if (token) {
                headers.set('Authorization', ` ${token}`);
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        createOrUpdateCart: builder.mutation({
            query: ({ body }) => ({
                url: '/create',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Cart'],
        }),
        editCart: builder.mutation({
            query: ({ itemId, quantity }) => ({
                url: `/edit/${itemId}`,
                method: 'PUT',
                body: { quantity },
            }),
            invalidatesTags: ['Cart'],
        }),

        deleteProductFromCart: builder.mutation({
            query: ({ itemId }) => ({
                url: `/delete/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
        deleteCart: builder.mutation({
            query:() => ({
                url: `/delete`,
                method: 'DELETE',
                
            }),
            invalidatesTags: ['Cart'],
        }),
        getAllCarts: builder.query({
            query: () => ({
                url: '/getAll',
                method: 'GET',
            }),
            providesTags: ['Cart'],
        }),
        getCartsByUser: builder.query({
            query: () => ({
                url: '/getCartByUser',
                method: 'GET',
            }),
            providesTags: ['Cart'],
        }),
    }),
});

export const {
    useCreateOrUpdateCartMutation,
    useEditCartMutation,
    useDeleteProductFromCartMutation,
    useDeleteCartMutation,
    useGetCartsByUserQuery,
    useGetAllCartsQuery,
} = cartApi;
