import { MdOutlineSettingsSuggest } from 'react-icons/md';
import { FaTruck } from 'react-icons/fa';
import { FcFaq } from 'react-icons/fc';
import { RiMedalLine } from 'react-icons/ri';
const ProfileDropdown = () => {
    return (
        <div className="absolute top-20 bg-blue-400 w-20 h-64 text-center z-30">
            <div className="">
                <div className="">
                    <div className="text-black text- font-semibold cursor-pointer  px-2 mb-2 flex gap-2  items-center">
                        <FaTruck />
                        <div>Track Order</div>
                    </div>

                    <div className="text-black font-semibold cursor-pointer  px-2 mb-2 flex gap-2 items-center">
                        <RiMedalLine />
                        <div>Best Seller</div>
                    </div>
                    <div className="text-black font-semibold cursor-pointer  px-2 mb-2 flex gap-2  items-center">
                        <MdOutlineSettingsSuggest />
                        <div>Settings</div>
                    </div>
                    <div className="text-black font-semibold cursor-pointer  px-2  flex gap-2  items-center">
                        <FcFaq />
                        <div>FAQ</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfileDropdown;
