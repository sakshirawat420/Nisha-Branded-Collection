const SubNavbar = () => {
    return (
        <div className=" h-20 flex  items-center w-full bg-white shadow-sm  fixed top-0 left-56 z-50 p-3">
            <div className="flex flex-col justify-center items-center ">
                <div className="text-2xl font-bold">Welcome, Jack</div>
                <div className="text-sm ">Check Your Website Stats</div>
            </div>

            <div className="flex justify-center items-center">Logout</div>
        </div>
    );
};

export default SubNavbar;
