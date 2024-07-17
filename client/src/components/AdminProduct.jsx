import React, { useState } from 'react';
import {
    useGetAllProductsQuery,
    useDeleteProductMutation,
} from '../api/productApi';
import ProductForm from './ProductForm';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';

const AdminProduct = () => {
    const { data: products, error, isLoading } = useGetAllProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleEditProduct = product => {
        setSelectedProduct(product);
        setIsFormOpen(true);
    };

    const handleCreateProduct = () => {
        setSelectedProduct(null);
        setIsFormOpen(true);
    };

    const handleDeleteProduct = async productId => {
        try {
            await deleteProduct(productId);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Admin Products</h1>
            <button
                onClick={handleCreateProduct}
                className="flex items-center bg-orange-200 px-4 py-2 font-semibold rounded hover:bg-orange-400 mb-4"
            >
                <MdAdd className="mr-2" />
                Add New Product
            </button>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading products</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products && products.map(product => (
                    <div key={product._id} className="border p-4 rounded">
                        <img
                            src={product.images?.[0]?.secure_url}
                            alt={product.productName}
                            className="h-40 w-full object-cover mb-2 rounded"
                        />
                        <h2 className="font-bold text-xl mb-2">
                            {product.productName}
                        </h2>
                        <p className="mb-2">{product.description}</p>
                        <p className="mb-2">Price: ${product.price}</p>
                        <p className="mb-2">
                            Cutted Price: ${product.cuttedPrice}
                        </p>
                        <p className="mb-2">Stock: {product.stock}</p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleEditProduct(product)}
                                className="flex items-center bg-blue-200 px-4 py-2 font-semibold rounded hover:bg-blue-400"
                            >
                                <MdEdit className="mr-2" />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="flex items-center bg-red-200 px-4 py-2 font-semibold rounded hover:bg-red-400"
                            >
                                <MdDelete className="mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {isFormOpen && (
                <ProductForm
                    product={selectedProduct}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminProduct;
