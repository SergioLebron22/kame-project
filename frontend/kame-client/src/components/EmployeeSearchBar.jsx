import PropTypes from 'prop-types';

export default function EmployeeSearchBar({ onSearch }) {
    const handleInputChange = (e) => {
        onSearch(e.target.value);
    }

    return (
        <>
            <div className="relative w-1/2 justify-end">
                <input
                    type="search"
                    className="block p-2.5 w-full z-20 text-sm text-gray-800 bg-white rounded-l-lg rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-white dark:border-s-gray-200  dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:border-blue-500"
                    placeholder="Search for a employee..."
                    onChange={handleInputChange}
                    required />
            </div>
        </>
    );
}

EmployeeSearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};
