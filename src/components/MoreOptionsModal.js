// MoreOptionsModal.jsx
import {useState} from 'react';
import { MdClose } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi'; // Settings icon
import { FaChartLine, FaBookmark, FaSignOutAlt } from 'react-icons/fa'; // Activity, Saved, Logout icons
import { IoMdSwitch } from 'react-icons/io'; // Switch Account icon
import { useNavigate } from 'react-router-dom';

export const MoreOptionsModal = ({ setIsMoreModalOpen }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const closeModal = () => setIsMoreModalOpen(false);

    const handleLogout = () => {
        setIsLoading(true);

        // Simulate an asynchronous logout action
        setTimeout(() => {
            // Clear user data
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');

            // Redirect after 5 seconds
            navigate('/');
        }, 5000);
    };


    return (
        <div className="fixed inset-0 flex items-center justify-start z-50">
            <div className={`bg-white shadow-xl mt-[450px] p-6 rounded-lg w-[250px] ${isLoading ? 'opacity-50 m-auto ' : ''}`}>
            {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-[150px]">
                        <div className="loader border-t-transparent border-solid border-gray-300 border-4 border-8 rounded-full w-16 h-16 mb-4"></div>
                        <p>Logging out...</p>
                    </div>
                ) : (
               <div>
               <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">More Options</h2>
                    <MdClose className="text-2xl cursor-pointer" onClick={closeModal} />
                </div>
                <ul className="space-y-2">
                    <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                        <FiSettings className="text-xl mr-3" />
                        <span>Settings</span>
                    </li>
                    <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                        <FaChartLine className="text-xl mr-3" />
                        <span>Your Activity</span>
                    </li>
                    <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                        <FaBookmark className="text-xl mr-3" />
                        <span>Saved</span>
                    </li>
                    <li className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                        <IoMdSwitch className="text-xl mr-3" />
                        <span>Switch Account</span>
                    </li>
                    <li onClick={handleLogout} className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded">
                        <FaSignOutAlt className="text-xl mr-3" />
                        <span>Logout</span>
                    </li>
                </ul>
               </div>
                )}
            </div>
        </div>
    );
};
     