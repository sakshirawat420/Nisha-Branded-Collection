import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SubCategoryApi = createApi({
    reducerPath: 'subCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/categories/subCategory',
        prepareHeaders: headers => {
            const token = window.sessionStorage.getItem('JWT');
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['SubCategory'],
    endpoints: builder => ({
        getAllSubcategories: builder.query({
            query: () => ({
                url: '/getAll',
                method: 'GET',
            }),
            providesTags: ['SubCategory'],
        }),
        getSubcategoryById: builder.query({
            query: subcategoryId => ({
                url: `/get/${subcategoryId}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'SubCategory', id }],
        }),
        createSubcategory: builder.mutation({
            query: subcategoryData => ({
                url: '/create',
                method: 'POST',
                body: subcategoryData,
            }),
            invalidatesTags: ['SubCategory'],
        }),
        editSubcategory: builder.mutation({
            query: ({ id, subcategoryData }) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: subcategoryData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'SubCategory', id }],
        }),
        deleteSubcategory: builder.mutation({
            query: subcategoryId => ({
                url: `/delete/${subcategoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'SubCategory', id }],
        }),
    }),
});

export const {
    useGetAllSubcategoriesQuery,
    useGetSubcategoryByIdQuery,
    useCreateSubcategoryMutation,
    useEditSubcategoryMutation,
    useDeleteSubcategoryMutation,
} = SubCategoryApi;
