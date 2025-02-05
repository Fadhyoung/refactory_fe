import React, { useState } from 'react';

// IMPORTS ICONS
import { GoTable } from "react-icons/go";
import { GoHome } from "react-icons/go";

const Navbar = ({ display, getHome, getAllData }) => {
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(true); // Dropdown is open by default
    
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={`navbar w-fit min-w-44 h-screen p-2 ${display} flex flex-col text-white bg-c-purple`}>
            {/* Logo */}
            <div className='w-20 mb-10'>
                <img className="w-full h-full object-cover self-center object-center" src="public/images/logo.png" alt="Logo" />
            </div>

            <button className='flex gap-2' onClick={getHome}>
                <GoHome />
                Home
            </button>

            
            <button onClick={toggleDropdown} className="flex items-center justify-between p-2 hover:bg-purple-700 rounded">
                <span className='flex items-center'><GoTable className="mr-2" />
                Tables</span>
                <span className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* Dropdown Items */}
            {isDropdownOpen && (
                <div className="pl-6">
                    <button onClick={() => getAllData("doctors")} className="w-full flex items-center p-2 hover:bg-purple-700 rounded">
                        <GoTable className="mr-2" /> Doctors
                    </button>
                    <button onClick={() => getAllData("users")}  className="w-full flex items-center p-2 hover:bg-purple-700 rounded">
                        <GoTable className="mr-2" /> Users
                    </button>
                    <button onClick={() => getAllData("slots")}  className="w-full flex items-center p-2 hover:bg-purple-700 rounded">
                        <GoTable className="mr-2" /> Slots
                    </button>
                </div>
            )}
        </div>
    );
};

export default Navbar;