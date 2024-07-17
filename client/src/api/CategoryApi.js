import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CategoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/categories',
        prepareHeaders: headers => {
            const token = window.sessionStorage.getItem('JWT');
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Category'],
    endpoints: builder => ({
        getAllCategories: builder.query({
            query: () => ({
                url: '/getAll',
                method: 'GET',
            }),
            providesTags: ['Category'],
        }),
        getCategoryById: builder.query({
            query: categoryId => ({
                url: `/get/${categoryId}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Category', id }],
        }),
        createCategory: builder.mutation({
            query: category => ({
                url: '/create',
                method: 'POST',
                body: category,
            }),
            invalidatesTags: ['Category'],
        }),
        editCategory: builder.mutation({
            query: ({ categoryId, category }) => ({
                url: `/edit/${categoryId}`,
                method: 'PUT',
                body: category,
            }),
            invalidatesTags: (result, error, { categoryId }) => [
                { type: 'Category', id: categoryId },
            ],
        }),
        deleteCategory: builder.mutation({
            query: categoryId => ({
                url: `/delete/${categoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Category', id }],
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation,
} = CategoryApi;
