import React from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
    return (
        <div className=" flex flex-col h-screen w-screen  ">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default MainLayout;
