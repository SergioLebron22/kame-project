// import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function SearchBar({ onSearch }) {
    const handleInputChange = (e) => {
        onSearch(e.target.value);
    }

    return (
        <>
            <div className="relative w-96 justify-end ">
                <input 
                    type="search" 
                    className="block p-2.5 w-full z-20 text-sm text-gray-800 bg-white rounded-l-lg rounded-e-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-white dark:placeholder-gray-400 dark:text-black dark:focus:border-blue-500" 
                    placeholder="Search for a patient..." 
                    onChange={handleInputChange}
                    required />
            </div>
        </>
    );
}
