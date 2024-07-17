import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/wishlist',
        prepareHeaders: headers => {
            const token = window.sessionStorage.getItem('JWT');
            // console.log(token);
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        addWishlist: builder.mutation({
            query: body => ({
                url: `/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Wishlist'],
        }),
        getAllWishlists: builder.query({
            query: () => ({
                url: `/getAll`,
                method: 'GET',
            }),
            providesTags: ['Wishlist'],
        }),
        getWishlistByUser: builder.query({
            query: () => ({
                url: `/getByUser`,
                method: 'GET',
            }),
            providesTags: ['Wishlist'],
        }),
        deleteWishlistByUser: builder.mutation({
            query: () => ({
                url: `/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Wishlist'],
        }),
        deleteProductFromWishlist: builder.mutation({
            query: productId => ({
                url: `/delete/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Wishlist'],
        }),
    }),
});

export const {
    useAddWishlistMutation,
    useGetAllWishlistsQuery,
    useDeleteProductFromWishlistMutation,
    useDeleteWishlistByUserMutation,
    useGetWishlistByUserQuery,
} = wishlistApi;
