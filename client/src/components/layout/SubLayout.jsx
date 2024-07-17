import React from 'react';
import SubNavbar from '../SubNavbar';
import Sidebar from '../Sidebar';
import { Outlet } from 'react-router-dom';
const SubLayout = () => {
    return (
        <div className=" flex h-screen w-screen overflow-y-scroll ">
            <Sidebar />
            <div className="flex flex-col w-full  ">
                {/* <SubNavbar /> */}
                <Outlet />
            </div>
        </div>
    );
};

export default SubLayout;
