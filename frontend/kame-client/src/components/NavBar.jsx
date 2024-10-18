import HeaderLogo from "./HeaderLogo";
import LogoutButton from "./LogoutButton";
// import Hamburger from "./Hamburger";
// import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function NavBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const name = localStorage.getItem('name');
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    

    return (
        <>
            <nav className="flex w-screen border-b-2 border-gray-300">
                <div className="bg-white h-20 w-full flex flex-wrap items-center justify-between mx-auto py-2">
                    <HeaderLogo />
                    <div className="flex items-center space-x-4 mr-16">
                        {name ? (
                            <div className="relative">
                                <div className="flex items-center " >
                                    <p className="font-semibold text-sky-600 hidden md:block mr-2">Logged in as {name}</p>
                                    <svg onClick={toggleDropdown} className="w-4 h-4 text-sky-600 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-3 flex align-center justify-center">
                                            <LogoutButton />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="hidden md:block">Not showing</p>
                        )}
                        {/* <Hamburger toggleSidebar={toggleSidebar}/> */}
                    </div>
                </div>
            </nav>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </>
    );
}