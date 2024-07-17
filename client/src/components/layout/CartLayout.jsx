import React from 'react';
import { Outlet } from 'react-router-dom';
import CartNavbar from '../CartNavbar';
const CartLayout = () => {
    return (
        <div className=" flex flex-col h-screen w-screen  ">
            <CartNavbar />
            <Outlet />
        </div>
    );
};

export default CartLayout;
