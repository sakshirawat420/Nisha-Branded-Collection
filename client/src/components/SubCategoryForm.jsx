import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    useCreateSubcategoryMutation,
    useEditSubcategoryMutation,
} from '../api/SubcategoryApi';
import { useGetAllCategoriesQuery } from '../api/CategoryApi';
import Modal from '../components/SubCategoryModal';
import { RxCross2 } from 'react-icons/rx';

const SubCategoryForm = ({ subcategory, onClose }) => {
    const [createSubcategory] = useCreateSubcategoryMutation();
    const [editSubcategory] = useEditSubcategoryMutation();
    const { data: categories, isLoading, error } = useGetAllCategoriesQuery();

    const [imagePreview, setImagePreview] = useState(null);

    const validationSchema = Yup.object().shape({
        SubCategoryName: Yup.string().required('Subcategory Name is required'),
        CategoryId: Yup.string().required('Category is required'),
        SubCategoryImage: Yup.mixed().nullable(),
    });
    

    const formik = useFormik({
        initialValues: {
            SubCategoryName: '',
            SubCategoryImage: null,
            CategoryId: '',
        },
        validationSchema,
        onSubmit: async values => {
            const formData = new FormData();
            formData.append('SubCategoryName', values.SubCategoryName);
            if (values.SubCategoryImage) {
                formData.append('SubCategoryImage', values.SubCategoryImage);
            }
            formData.append('CategoryId', values.CategoryId);

            try {
                if (subcategory && subcategory._id) {
                    // Edit existing subcategory
                    await editSubcategory({
                        id: subcategory._id,
                        subcategoryData: formData,
                    });
                } else {
                    // Create new subcategory
                    await createSubcategory(formData);
                }
                onClose();
            } catch (error) {
                console.error('Error saving subcategory:', error);
            }
        },
    });

    useEffect(() => {
        if (subcategory) {
            formik.setValues({
                SubCategoryName: subcategory.SubCategoryName,
                CategoryId: subcategory.CategoryId,
                SubCategoryImage: null,
            });
            if (subcategory.SubCategoryImage) {
                setImagePreview(subcategory.SubCategoryImage.secure_url);
            }
        } else {
            formik.resetForm();
            setImagePreview(null);
        }
    }, [subcategory]);

    const handleImageChange = event => {
        const file = event.currentTarget.files[0];
        if (file) {
            formik.setFieldValue('SubCategoryImage', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-4">
                    <label className="font-bold">Subcategory Name:</label>
                    <input
                        type="text"
                        name="SubCategoryName"
                        value={formik.values.SubCategoryName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded"
                    />
                    {formik.touched.SubCategoryName &&
                    formik.errors.SubCategoryName ? (
                        <div className="text-red-500">
                            {formik.errors.SubCategoryName}
                        </div>
                    ) : null}

                    <label className="font-bold">Subcategory Image:</label>
                    {/* Render current image if available */}
                    {imagePreview && (
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Current Subcategory Image"
                                className="h-40 rounded"
                            />
                            <button
                                type="button"
                                onClick={() => setImagePreview(null)}
                                className="absolute top-0 right-0   rounded-full p-1"
                            >
                                <RxCross2 className=" hover:scale-150 transition-transform duration-300 cursor-pointer" />
                            </button>
                        </div>
                    )}
                    {!imagePreview && (
                        <input
                            type="file"
                            name="SubCategoryImage"
                            onChange={handleImageChange}
                            onBlur={formik.handleBlur}
                            className="p-2 border rounded"
                        />
                    )}
                    {formik.touched.SubCategoryImage &&
                    formik.errors.SubCategoryImage ? (
                        <div className="text-red-500">
                            {formik.errors.SubCategoryImage}
                        </div>
                    ) : null}

                    <label className="font-bold">Category:</label>
                    {isLoading ? (
                        <div>Loading categories...</div>
                    ) : error ? (
                        <div>Error loading categories</div>
                    ) : (
                        <select
                            name="CategoryId"
                            value={formik.values.CategoryId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="p-2 border rounded"
                        >
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.CategoryName}
                                </option>
                            ))}
                        </select>
                    )}
                    {formik.touched.CategoryId && formik.errors.CategoryId ? (
                        <div className="text-red-500">
                            {formik.errors.CategoryId}
                        </div>
                    ) : null}

                    <button
                        type="submit"
                        className="bg-orange-200 px-4 py-2 font-semibold rounded hover:bg-orange-400"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default SubCategoryForm;
