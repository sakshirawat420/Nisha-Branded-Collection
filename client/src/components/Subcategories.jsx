import React, { useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';
import { IoMdSearch } from 'react-icons/io';
import {
    useGetAllSubcategoriesQuery,
    useDeleteSubcategoryMutation,
} from '../api/SubcategoryApi';
import SubCategoryForm from './SubCategoryForm';
import SubCategoryModal from './SubCategoryModal';
import { MdDelete } from 'react-icons/md';

const Subcategories = () => {
    const {
        data: subcategories,
        error,
        isLoading,
    } = useGetAllSubcategoriesQuery();
    const [deleteSubcategory] = useDeleteSubcategoryMutation();
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    const handleEditClick = subcategory => {
        setModalContent(
            <SubCategoryForm subcategory={subcategory} onClose={closeModal} />
        );
        setShowModal(true);
    };

    const handleCreateNew = () => {
        setModalContent(<SubCategoryForm onClose={closeModal} />);
        setShowModal(true);
    };

    const handleDeleteSubcategory = async subcategory => {
        try {
            await deleteSubcategory(subcategory.id);
            setDeleteCategoryId(null); // Reset delete state after deletion
            
        } catch (error) {
            console.error('Error deleting subcategory:', error);
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
        return <div>Error loading subcategories</div>;
    }

    return (
        <div className="p-10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="font-bold text-3xl">Manage SubCategories</div>
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
                        onClick={handleCreateNew} // Trigger create modal on click
                    >
                        Create New
                    </div>
                </div>
            </div>
            <div className="border-t border-black"></div>
            <div className="grid grid-cols-4 gap-2 justify-start">
                {subcategories.map(subcategory => (
                    <div
                        key={subcategory.id}
                        className="flex flex-col gap-4 justify-start border-black border-2 rounded bg-gray-200 p-4"
                    >
                        <div className="flex justify-between">
                            <div className="flex flex-col justify-start gap-1">
                                <div className="text-xs font-bold text-orange-400">
                                    Sub Category
                                </div>
                                <div className="text-md font-bold">
                                    {subcategory.SubCategoryName}
                                </div>
                            </div>
                            <div className="flex flex-col justify-start gap-1">
                                <div className="text-xs font-bold text-orange-400">
                                    Action
                                </div>
                                <div className="text-md font-bold flex gap-1">
                                    <BiSolidEditAlt
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleEditClick(subcategory)
                                        }
                                    />
                                    <MdDelete
                                        className="hover:scale-150 transition-transform duration-300 cursor-pointer"
                                        onClick={
                                            () =>
                                                setDeleteCategoryId(
                                                    subcategory._id
                                                ) // Set delete state when clicking delete
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 h-[250px] w-full justify-start items-center">
                            <div className="text-xs font-bold text-orange-400">
                                {' '}
                                SubCategory Image
                            </div>
                            <img
                                src={
                                    subcategory.SubCategoryImage.secure_url ||
                                    img
                                }
                                className="object-contain h-full w-full pb-4"
                                alt="Category"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <SubCategoryModal show={showModal} onClose={closeModal}>
                {modalContent}
            </SubCategoryModal>
            <SubCategoryModal
                show={!!deleteCategoryId} // Show modal if deleteCategoryId is set
                onClose={() => setDeleteCategoryId(null)} // Reset delete state when closing modal
            >
                <div className="text-lg font-bold text-red-500">
                    Are you sure you want to delete this subcategory?
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        className="hover:bg-orange-500 bg-orange-200 text-white px-4 py-2 rounded mr-2"
                        onClick={() => {
                            handleDeleteSubcategory({ id: deleteCategoryId });
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
            </SubCategoryModal>
        </div>
    );
};

export default Subcategories;
