import {Link} from "react-router-dom";
import logo from '../assets/logo-transparent-png.png'

export const Navbar = () => {

    const isTokenExists = () => {
        const token = sessionStorage.getItem('jwtToken');
        return token !== null;
    };

    return (
        <nav className="bg-blue-500 p-4 flex items-center justify-between">
            <Link  to="/" className="text-white font-bold text-xl">
                <img src={logo} alt="Banknator Logo" className="z-20 max-w-48 "/>
            </Link>

            <div className="space-x-4">
                <Link className="text-white " to={"/"}>Home</Link>
                <Link className="text-white " to={"#"}>About</Link>
                <Link className="text-white " to={"#"}>Services</Link>
                {isTokenExists() ? (
                    <>
                        <Link className="text-white " to={""}>Dashboard</Link>
                        <Link className="text-white " to={""}>Logout</Link>
                    </>
                ) : (
                    <>
                        <Link className="text-white " to={""}>Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};
