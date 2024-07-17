import React from 'react';
import {
    RiShoppingCartLine,
    RiUser3Line,
    RiMoneyDollarCircleLine,
    RiPieChartLine,
} from 'react-icons/ri';

const data = [
    {
        icon: <RiShoppingCartLine className="text-red-500" size={20} />,
        label: 'Total Orders',
        value: '$1,210,387',
        iconColor: 'text-red-500',
    },
    {
        icon: <RiUser3Line className="text-blue-500" size={20} />,
        label: 'Total Customers',
        value: '1,024',
        iconColor: 'text-blue-500',
    },
    {
        icon: <RiMoneyDollarCircleLine className="text-green-500" size={20} />,
        label: 'Total Sales',
        value: '$84,572',
        iconColor: 'text-green-500',
    },
    {
        icon: <RiPieChartLine className="text-yellow-500" size={20} />,
        label: 'Total Items Sold',
        value: '34%',
        iconColor: 'text-yellow-500',
    },
];

const AdminPanel = () => {
    return (
        <div className="flex flex-col w-full p-10">
            <div className="text-3xl font-bold">Overview</div>
            <div className="text-sm text-stone-500 font-semibold ">
                23 May 2023
            </div>
            <div className="grid grid-cols-4 gap-6 ">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-6 items-center justify-center  py-6 my-4 rounded-xl bg-white shadow-md "
                    >
                        <div className={`${item.iconColor}`}>{item.icon}</div>
                        <div className="flex flex-col">
                            <div className={`${item.iconColor} font-semibold`}>
                                {item.label}
                            </div>
                            <div className="font-semibold">{item.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
