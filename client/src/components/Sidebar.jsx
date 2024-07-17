const Sidebar = () => {
    return (
        <div className=" justify-start top-[80px] left-0 bottom-0 z-40 w-56 max-h-screen shadow-lg  overflow-y-scroll hidden md:block  fixed">
            <div className="border-gray-200 border-2 flex flex-col justify-start px-4 py-2 w-full  gap-3">
                <div className="font-semibold text-lg">SORT BY</div>
                <div className="flex flex-col justify-center ">
                    <div className="flex  justify-start items-center gap-2 text-sm ">
                        <input type="checkbox" />
                        <div>What's New</div>
                    </div>
                    <div className="flex  justify-start items-center gap-2 text-sm">
                        <input type="checkbox" />
                        <div>Customer Ratings</div>
                    </div>
                    <div className="flex  justify-start items-center gap-2 text-sm">
                        <input type="checkbox" />
                        <div>Price: High to Low</div>
                    </div>
                    <div className="flex  justify-start items-center gap-2 text-sm">
                        <input type="checkbox" />
                        <div>Price: Low to High</div>
                    </div>
                </div>
            </div>
            <div className="border-gray-200  flex flex-col justify-start   px-4 py-2  w-full gap-3 border-l-2 border-r-2 border-b-2">
                <div className="font-semibold text-lg w-full     ">FILTERS</div>
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-semibold">PRICE</div>
                    <div className="flex flex-col justify-center ">
                        <div className="flex  justify-start items-center gap-2 text-sm ">
                            <input type="checkbox" />
                            <div>Rs. 0 to Rs. 100</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>Rs. 100 to Rs. 500</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>Rs. 500 to Rs. 1000</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>Rs. 1000 to Rs. 2000</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>Above Rs. 2000</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-semibold">CATEGORY</div>
                    <div className="flex flex-col justify-center ">
                        <div className="flex  justify-start items-center gap-2 text-sm ">
                            <input type="checkbox" />
                            <div>T-Shirts</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>Shirts</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>Jeans</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>Pants</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>Coats</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-semibold">DISCOUNT</div>
                    <div className="flex flex-col justify-center ">
                        <div className="flex  justify-start items-center gap-2 text-sm ">
                            <input type="checkbox" />
                            <div>1% to 20%</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>21% to 40%</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>41% to 60%</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>61% to 80%</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>81% to 100%</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-semibold">DISCOUNT</div>
                    <div className="flex flex-col justify-center ">
                        <div className="flex  justify-start items-center gap-2 text-sm ">
                            <input type="checkbox" />
                            <div>1% to 20%</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>21% to 40%</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>41% to 60%</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>61% to 80%</div>
                        </div>
                        <div className="flex  justify-start items-center gap-2 text-sm">
                            <input type="checkbox" />
                            <div>81% to 100%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
