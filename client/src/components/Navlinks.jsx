import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { links } from './MyLinks';

const NavLinks = () => {
    const [heading, setHeading] = useState('');
    const [subHeading, setSubHeading] = useState('');
    return (
        <>
            {links.map(link => (
                <div>
                    <div className="md:cursor-pointer group flex justify-center items-center gap-3 z-50">
                        <h1
                            className={`  py-7 flex justify-center items-center md:pr-0  group ${link.style} font-semibold cursor-pointer h-full  w-20 border-b-4 border-transparent
                           
                            `}
                            onClick={() => {
                                heading !== link.name
                                    ? setHeading(link.name)
                                    : setHeading('');
                                setSubHeading('');
                            }}
                        >
                            {link.name}
                        </h1>
                        {link.submenu && (
                            <div>
                                <div className="absolute top-20  left-60 hidden group-hover:md:block hover:md:block z-30 ">
                                    <div className="py-1"></div>
                                    <div className="bg-white p-5 grid grid-cols-3 gap-10">
                                        {link.sublinks.map(mysublinks => (
                                            <div>
                                                <h1
                                                    className={twMerge(
                                                        'text-lg font-semibold ',
                                                        link.substyle
                                                    )}
                                                >
                                                    {mysublinks.Head}
                                                </h1>
                                                {mysublinks.sublink.map(
                                                    slink => (
                                                        <div className="text-sm text-black my-2.5 hover:font-semibold">
                                                            <Link
                                                                to={slink.link}
                                                                className="hover:text-primary"
                                                            >
                                                                {slink.name}
                                                            </Link>
                                                        </div>
                                                    )
                                                )}
                                                <div className="h-0 border-t-2 border-slate-300 mt-6  "></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Mobile menus */}
                    <div
                        className={`
                            ${heading === link.name ? 'md:hidden' : 'hidden'}
                        `}
                    >
                        {/* sublinks */}
                        {link.sublinks.map(slinks => (
                            <div>
                                <div>
                                    <h1
                                        onClick={() =>
                                            subHeading !== slinks.Head
                                                ? setSubHeading(slinks.Head)
                                                : setSubHeading('')
                                        }
                                        className="py-4 pl-7 font-semibold  flex justify-center items-center md:pr-0 pr-5"
                                    >
                                        {slinks.Head}

                                        <span className="text-xl md:mt-1 md:ml-2 inline">
                                            <IoIosArrowDown />
                                        </span>
                                    </h1>
                                    <div
                                        className={`
                                            ${
                                                subHeading === slinks.Head
                                                    ? 'md:hidden'
                                                    : 'hidden'
                                            }
                                        `}
                                    >
                                        {slinks.sublink.map(slink => (
                                            <div className="py-3 pl-14">
                                                <Link to={slink.link}>
                                                    {slink.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
};

export default NavLinks;
