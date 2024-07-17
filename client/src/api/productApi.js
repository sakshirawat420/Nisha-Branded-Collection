import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/categories/subCategory/product',
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
        createProduct: builder.mutation({
            query: productData => ({
                url: '/create',
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ['Product'],
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: '/getAll',
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        getProductById: builder.query({
            query: productId => ({
                url: `/get/${productId}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        getProductsByTag: builder.query({
            query: tag => ({
                url: `/tag/${tag}`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        editProduct: builder.mutation({
            query: ({ productId, updatedProductData }) => ({
                url: `/edit/${productId}`,
                method: 'PUT',
                body: updatedProductData,
            }),
            invalidatesTags: (result, error, { productId }) => [
                { type: 'Product', id: productId },
            ],
        }),
        deleteProduct: builder.mutation({
            query: productId => ({
                url: `/delete/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetProductsByTagQuery,
    useEditProductMutation,
    useDeleteProductMutation,
} = productApi;
