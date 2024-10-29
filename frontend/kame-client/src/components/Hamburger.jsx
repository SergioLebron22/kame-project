import PropTypes from 'prop-types';


export default function Hamburger({ toggleSidebar }) {
    return (
        <>
            <button onClick={toggleSidebar} type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-sky-200 dark:focus:ring-sky-500" aria-controls="navbar-hamburger" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </>
    );
}

Hamburger.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
};