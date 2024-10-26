import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { logout } = useAuth(); 
    const dropdownRef = useRef(null); 

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <Link to={"/"} className="text-white text-lg font-semibold cursor-pointer">MyApp</Link>

            <div className='flex items-center gap-10'>
            <Link to={"/leaderboard"} className='text-white cursor-pointer'>
                Leaderboard
            </Link>
            <div className="relative" ref={dropdownRef}>
                <img
                    src={ "https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-617.jpg?ga=GA1.1.902066542.1729875847&semt=ais_hybrid"}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={toggleDropdown}
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                />

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
                        <button
                            className="w-full text-left text-red-500 hover:bg-gray-100 p-2 rounded"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
            </div>
        
        </nav>
    );
};

export default Navbar;
