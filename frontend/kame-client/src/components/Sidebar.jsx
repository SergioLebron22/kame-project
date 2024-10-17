import PropTypes from "prop-types";
import logo from "../images/logo.png"
import Hamburger from "./Hamburger";
import LogoutButton from "./LogoutButton";

export default function Sidebar({ isOpen, toggleSidebar}) {
    return (
        <div className={`fixed inset-y-0 right-0 w-96 bg-white text-gray-500 border border-gray-300 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out`}>
            <div className="flex align-center justify-end mr-2 mt-1">
                <Hamburger toggleSidebar={toggleSidebar} />
            </div>
            <div className="flex align-center justify-center mr-4 ml-4">
                <img src={logo} className="flex h-36 ml-4"/>
            </div>
            <nav className="mt-10">
                <a href="/dashboard/register-employee" className="block text-center py-2.5 px-4 my-5 rounded transition duration-200 hover:bg-sky-400 hover:text-white">
                Register Employee
                </a>
                <a href="#" className="block text-center py-2.5 px-4 my-5 rounded transition duration-200 hover:bg-sky-400 hover:text-white">
                Employees on Shift
                </a>
                <a href="#" className="block text-center py-2.5 px-4 my-5 rounded transition duration-200 hover:bg-sky-400 hover:text-white">
                Add Vitals
                </a>
                <a href="#" className="block text-center py-2.5 px-4 my-5 rounded transition duration-200 hover:bg-sky-400 hover:text-white">
                Profile (to be developed)
                </a>
            </nav>
            <div className="absolute bottom-0 w-full flex align-center justify-center mb-24">
                <LogoutButton />
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};
