import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    useCreateProductMutation,
    useEditProductMutation,
    useGetProductByIdQuery,
} from '../api/productApi';
import { useGetAllCategoriesQuery } from '../api/CategoryApi';
import { useGetAllSubcategoriesQuery } from '../api/SubcategoryApi';
import Modal from '../components/ProductModal';
import { RxCross2 } from 'react-icons/rx';

const ProductForm = ({ product = null, onClose }) => {
    const [createProduct] = useCreateProductMutation();
    const [editProduct] = useEditProductMutation();
    const { data: categories } = useGetAllCategoriesQuery();
    const { data: subcategories } = useGetAllSubcategoriesQuery();
    const [imagePreview, setImagePreview] = useState(null);

    const validationSchema = Yup.object().shape({
        productName: Yup.string().required('Product Name is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().required('Price is required'),
        cuttedPrice: Yup.number().required('Cutted Price is required'),
        stock: Yup.number().required('Stock is required'),
        CategoryId: Yup.string().required('Category is required'),
        SubcategoryId: Yup.string().required('Subcategory is required'),
        images: Yup.mixed().nullable(),
    });

    const formik = useFormik({
        initialValues: {
            productName: '',
            description: '',
            price: '',
            cuttedPrice: '',
            stock: '',
            CategoryId: '',
            SubcategoryId: '',
            images: null,
        },
        validationSchema,
        onSubmit: async values => {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (key === 'images' && values[key]) {
                    for (let i = 0; i < values[key].length; i++) {
                        formData.append('images', values[key][i]);
                    }
                } else {
                    formData.append(key, values[key]);
                }
            });
            
            try {
                if (product && product._id) {
                    await editProduct({
                        productId: product._id,
                        updatedProductData: formData,
                    });
                } else {
                    await createProduct(formData);
                }
                onClose();
            } catch (error) {
                console.error('Error saving product:', error);
            }
        },
    });

    useEffect(() => {
        if (product) {
            formik.setValues({
                productName: product.productName,
                description: product.description,
                price: product.price,
                cuttedPrice: product.cuttedPrice,
                stock: product.stock,
                CategoryId: product.CategoryId,
                SubcategoryId: product.SubcategoryId,
                images: null,
            });
            if (product.images && product.images.length > 0) {
                setImagePreview(product.images[0].secure_url);
            }
        } else {
            formik.resetForm();
            setImagePreview(null);
        }
    }, [product]);

    const handleImageChange = event => {
        const files = event.currentTarget.files;
        if (files) {
            formik.setFieldValue('images', files);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(files[0]);
        }
    };

    return (
        <Modal show={true} onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-4">
                    <label className="font-bold">Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        value={formik.values.productName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded"
                    />
                    {formik.touched.productName &&
                        formik.errors.productName && (
                            <div className="text-red-500">
                                {formik.errors.productName}
                            </div>
                        )}

                    <label className="font-bold">Description:</label>
                    <textarea
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded"
                    />
                    {formik.touched.description &&
                        formik.errors.description && (
                            <div className="text-red-500">
                                {formik.errors.description}
                            </div>
                        )}

                    <label className="font-bold">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded"
                    />
                    {formik.touched.price && formik.errors.price && (
                        <div className="text-red-500">
                            {formik.errors.price}
                        </div>
                    )}

                    <label className="font-bold">Cutted Price:</label>
                    <input
                        type="number"
                        name="cuttedPrice"
                        value={formik.values.cuttedPrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded"
                    />
                    {formik.touched.cuttedPrice &&
                        formik.errors.cuttedPrice && (
                            <div className="text-red-500">
                                {formik.errors.cuttedPrice}
                            </div>
                        )}

                    <label className="font-bold">Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded"
                    />
                    {formik.touched.stock && formik.errors.stock && (
                        <div className="text-red-500">
                            {formik.errors.stock}
                        </div>
                    )}

                    <label className="font-bold">Category:</label>
                    <select
                        name="CategoryId"
                        value={formik.values.CategoryId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded"
                    >
                        {categories &&
                            categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.CategoryName}
                                </option>
                            ))}
                    </select>
                    {formik.touched.CategoryId && formik.errors.CategoryId && (
                        <div className="text-red-500">
                            {formik.errors.CategoryId}
                        </div>
                    )}

                    <label className="font-bold">Subcategory:</label>
                    <select
                        name="SubcategoryId"
                        value={formik.values.SubcategoryId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded"
                    >
                        {subcategories &&
                            subcategories.map(subcategory => (
                                <option
                                    key={subcategory._id}
                                    value={subcategory._id}
                                >
                                    {subcategory.SubCategoryName}
                                </option>
                            ))}
                    </select>
                    {formik.touched.SubcategoryId &&
                        formik.errors.SubcategoryId && (
                            <div className="text-red-500">
                                {formik.errors.SubcategoryId}
                            </div>
                        )}

                    <label className="font-bold">Product Images:</label>
                    {imagePreview && (
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Product Image"
                                className="h-40 rounded"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    formik.setFieldValue('images', null);
                                }}
                                className="absolute top-0 right-0 rounded-full p-1"
                            >
                                <RxCross2 className="hover:scale-150 transition-transform duration-300 cursor-pointer" />
                            </button>
                        </div>
                    )}
                    {!imagePreview && (
                        <div>
                            <input
                                type="file"
                                name="images"
                                onChange={handleImageChange}
                                onBlur={formik.handleBlur}
                                className="p-2 border rounded"
                                multiple // Allow multiple file selection
                                accept="image/*" // Specify accepted file types (images)
                            />
                            <div className="text-xs text-gray-500 mt-1">
                                (You can select multiple images)
                            </div>
                        </div>
                    )}
                    {formik.touched.images && formik.errors.images && (
                        <div className="text-red-500">
                            {formik.errors.images}
                        </div>
                    )}

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

export default ProductForm;
