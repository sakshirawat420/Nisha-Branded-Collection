import { useState } from 'react';
import logo from '../assets/Heading.png';
import { IoIosHeartEmpty } from 'react-icons/io';
import { SlHandbag } from 'react-icons/sl';
import { BsSearch } from 'react-icons/bs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navlinks from './Navlinks';
import { Link } from 'react-router-dom';

import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div className=" h-20 flex justify-between bg-white shadow-lg w-screen fixed top-0 z-50">
            {/* Logo */}
            <img src={logo} alt="Logo" className="p-2" />

            {/* Navigation Links */}
            <div className=" md:flex hidden justify-center items-center">
                <Navlinks />
            </div>

            {/* Search */}
            <div className=" gap-6 justify-start items-center bg-blue-50 my-6 rounded px-3 w-96 h-10 md:flex hidden">
                <BsSearch />
                <input
                    type="text"
                    className="bg-blue-50 placeholder-black font-semibold w-80 focus:outline-none"
                    placeholder={'Search Products Here'}
                />
            </div>

            {/* Profile, Wishlist, Cart */}
            <div className="flex gap-2 justify-center items-center">
                <div className="flex flex-col justify-center items-center  hover:border-lime-400 hover:border-b-4 cursor-pointer h-full w-14 ">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div className="font-semibold text-xs  ">Profile</div>
                </div>

                {/* Wishlist */}
                <Link
                    className="flex flex-col gap-1 justify-center items-center hover:border-red-300 h-full hover:border-b-4 cursor-pointer w-14"
                    to="/wishlist"
                >
                    <IoIosHeartEmpty />
                    <div className="font-semibold text-xs border-b-2 border-transparent">
                        Wishlist
                    </div>
                </Link>

                {/* Cart */}
                <Link
                    className="flex flex-col gap-1 justify-center items-center hover:border-red-300 h-full hover:border-b-4 cursor-pointer w-14"
                    to="/cart"
                >
                    <SlHandbag />
                    <div className="font-semibold text-xs border-b-2 border-transparent">
                        Cart
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
