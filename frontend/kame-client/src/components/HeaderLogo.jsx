import { Link } from "react-router-dom";
import logo from "../images/logo.png"

export default function HeaderLogo() {
    return (
        <Link to="/home/" className="flex h-full items-cenetr space-x-3">
            <img src={logo} alt="logo" className="h-16 pl-3 ml-20" />
        </Link>
    );
}