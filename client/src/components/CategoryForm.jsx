import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    useCreateCategoryMutation,
    useEditCategoryMutation,
} from '../api/CategoryApi';
import Modal from '../components/CategoriesModal';
import { RxCross2 } from 'react-icons/rx';

const CategoryForm = ({ category = null, onClose }) => {
    const [createCategory] = useCreateCategoryMutation();
    const [editCategory] = useEditCategoryMutation();
    const [imagePreview, setImagePreview] = useState(null);

    const validationSchema = Yup.object().shape({
        CategoryName: Yup.string().required('Category Name is required'),
        CategoryImage: Yup.mixed().nullable(),
    });

    const formik = useFormik({
        initialValues: {
            CategoryName: '',
            CategoryImage: null,
        },
        validationSchema,
        onSubmit: async values => {
            const formData = new FormData();
            formData.append('CategoryName', values.CategoryName);
            if (values.CategoryImage) {
                formData.append('CategoryImage', values.CategoryImage);
            }

            try {
                if (category && category._id) {
                    // Edit existing category
                    await editCategory({
                        id: category._id,
                        categoryData: formData,
                    });
                } else {
                    // Create new category
                    await createCategory(formData);
                }
                onClose();
            } catch (error) {
                console.error('Error saving category:', error);
            }
        },
    });

    useEffect(() => {
        if (category) {
            formik.setValues({
                CategoryName: category.CategoryName,
                CategoryImage: null,
            });
            if (category.CategoryImage) {
                setImagePreview(category.CategoryImage.secure_url);
            }
        } else {
            formik.resetForm();
            setImagePreview(null);
        }
    }, [category]);

    const handleImageChange = event => {
        const file = event.currentTarget.files[0];
        if (file) {
            formik.setFieldValue('CategoryImage', file);
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
                    <label className="font-bold">Category Name:</label>
                    <input
                        type="text"
                        name="CategoryName"
                        value={formik.values.CategoryName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded"
                    />
                    {formik.touched.CategoryName &&
                    formik.errors.CategoryName ? (
                        <div className="text-red-500">
                            {formik.errors.CategoryName}
                        </div>
                    ) : null}

                    <label className="font-bold">Category Image:</label>
                    {imagePreview && (
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Current Category Image"
                                className="h-40 rounded"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    formik.setFieldValue('CategoryImage', null);
                                }}
                                className="absolute top-0 right-0 rounded-full p-1"
                            >
                                <RxCross2 className="hover:scale-150 transition-transform duration-300 cursor-pointer" />
                            </button>
                        </div>
                    )}
                    {!imagePreview && (
                        <input
                            type="file"
                            name="CategoryImage"
                            onChange={handleImageChange}
                            onBlur={formik.handleBlur}
                            className="p-2 border rounded"
                        />
                    )}
                    {formik.touched.CategoryImage &&
                    formik.errors.CategoryImage ? (
                        <div className="text-red-500">
                            {formik.errors.CategoryImage}
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

export default CategoryForm;
