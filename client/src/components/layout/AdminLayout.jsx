import React from 'react';
// import SubNavbar from '../SubNavbar';
import AdminSidebar from '../AdminSidebar';
import { Outlet } from 'react-router-dom';
const AdminLayout = () => {
    return (
        <div className=" flex h-screen w-screen  overflow-hidden">
            <AdminSidebar />
            <div className="flex flex-col w-full overflow-scroll bg-stone-100 ">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
