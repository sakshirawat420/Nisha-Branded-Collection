import React, { useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';
import { IoMdSearch } from 'react-icons/io';
import {
    useGetAllCategoriesQuery,
    useDeleteCategoryMutation,
} from '../api/CategoryApi';
import Modal from '../components/CategoriesModal';
import CategoryForm from '../components/CategoryForm';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
    const { data: categories, error, isLoading } = useGetAllCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null); // State for delete action

    const handleEditClick = category => {
        setModalContent(
            <CategoryForm category={category} onClose={closeModal} />
        );
        setShowModal(true);
    };

    const handleCreateNew = () => {
        setModalContent(<CategoryForm onClose={closeModal} />);
        setShowModal(true);
    };

    const handleDeleteCategory = async categoryId => {
        try {
            await deleteCategory(categoryId);
            setDeleteCategoryId(null); // Reset delete state after deletion
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent(null);
        setDeleteCategoryId(null); // Reset delete state when closing modal
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading categories</div>;
    }

    return (
        <div className="p-10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="font-bold text-3xl">Manage Categories</div>
                <div className="flex items-center gap-6">
                    <div className="flex h-fit items-center gap-2 bg-white py-2 px-4 rounded-3xl border-black border-2">
                        <input
                            type="text"
                            placeholder="Search here.."
                            className="placeholder:text-black focus:outline-none"
                        />
                        <IoMdSearch />
                    </div>
                    <div
                        className="bg-orange-200 px-4 py-2 font-semibold rounded hover:bg-orange-400"
                        onClick={handleCreateNew}
                    >
                        Create New
                    </div>
                </div>
            </div>
            <div className="border-t border-black w-full"></div>
            <div className="grid grid-cols-5 gap-2 ">
                {categories.map(category => (
                    <div
                        key={category._id}
                        className="flex flex-col gap-2 border-black border-2 rounded bg-gray-200 p-4"
                    >
                        <div className="flex justify-between">
                            <div className="flex flex-col justify-start gap-1">
                                <div className="text-xs font-bold text-orange-400">
                                    Category Name
                                </div>
                                <div className="text-md font-bold">
                                    {category.CategoryName}
                                </div>
                            </div>
                            <div className="flex flex-col justify-start gap-1 items-center">
                                <div className="text-xs font-bold text-orange-400">
                                    Action
                                </div>
                                <div className="flex gap-2">
                                    <div
                                        className="text-md font-bold cursor-pointer hover:scale-150 transition-transform duration-300"
                                        onClick={() =>
                                            handleEditClick(category)
                                        }
                                    >
                                        <BiSolidEditAlt />
                                    </div>
                                    <MdDelete
                                        className="hover:scale-150 transition-transform duration-300 cursor-pointer"
                                        onClick={
                                            () =>
                                                setDeleteCategoryId(
                                                    category._id
                                                ) // Set delete state when clicking delete
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-1 h-[250px] w-full">
                            <div className="text-xs font-bold text-orange-400">
                                Category Image
                            </div>
                            <img
                                src={category.CategoryImage.secure_url || img}
                                alt={category.CategoryName}
                                className="object-contain h-full w-full pb-4"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Modal show={showModal} onClose={closeModal}>
                {modalContent}
            </Modal>
            {/* Modal for delete confirmation */}
            <Modal
                show={!!deleteCategoryId} // Show modal if deleteCategoryId is set
                onClose={() => setDeleteCategoryId(null)} // Reset delete state when closing modal
            >
                <div className="text-lg font-bold text-red-500">
                    Are you sure you want to delete this category?
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        className="hover:bg-orange-500 bg-orange-200 text-white px-4 py-2 rounded mr-2"
                        onClick={() => {
                            handleDeleteCategory(deleteCategoryId);
                            closeModal();
                        }}
                    >
                        Yes, Delete
                    </button>
                    <button
                        className="bg-gray-300 px-4 py-2 rounded"
                        onClick={() => setDeleteCategoryId(null)} // Reset delete state when cancelling
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Categories;
