import React from 'react';
import logo from '../assets/Heading.png';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper function to determine if the path is active
    const isActive = path => location.pathname === path;

    const menuItems = [
        { name: 'Dashboard', path: '/admin' },
        { name: 'Orders', path: '/orders' },
        { name: 'Categories', path: '/admincategory' },
        { name: 'Subcategories', path: '/adminsubcategory' },
        { name: 'Products', path: '/adminproducts' },
        { name: 'Logout' },
    ];

    return (
        <div className="justify-start  z-40 w-56 max-h-screen  overflow-y-scroll  bg-white">
            <img src={logo} alt="Logo" className="p-4" />
            <div className="flex flex-col justify-start pl-2 py-2 w-full gap-3">
                {menuItems.map(item => (
                    <div
                        key={item.name}
                        className={`py-2 pl-2 font-semibold cursor-pointer rounded 
                        ${
                            isActive(item.path)
                                ? 'bg-gradient-to-r from-orange-50 to-orange-200 border-r-4 border-r-orange-300'
                                : 'hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-200 hover:border-r-4 hover:border-r-orange-300'
                        }`}
                        onClick={() => navigate(item.path, { replace: true })}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSidebar;
