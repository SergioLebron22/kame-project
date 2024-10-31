import { Link } from "react-router-dom";
import logo from "../images/logo.png"

export default function HeaderLogo() {
    const roleipoli = localStorage.getItem('role');
    const lonkTo = roleipoli === 'admin' ? '/dashboard' : '/home'
    return (
        <Link to={lonkTo} className="flex items-cenetr space-x-3 ">
            <img src={logo} alt="logo" className="h-16 pl-3 ml-20" />
        </Link>
    );
}
