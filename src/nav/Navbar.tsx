import {Link} from "react-router-dom";
import logo from '../assets/logo-transparent-png.png'

import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, logout} from "../redux/slices/authSlice.ts";

export const Navbar = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch()
    const logoutLink = () => {
        sessionStorage.removeItem("Authorization")
        dispatch(logout())
    }

    return (
        <nav className="bg-blue-500 p-4 flex items-center justify-between">
            <Link  to="/" className="text-white font-bold text-xl">
                <img src={logo} alt="Banknator Logo" className="z-20 max-w-48 "/>
            </Link>

            <div className="space-x-4">
                <Link className="text-white " to={"/"}>Home</Link>
                <Link className="text-white " to={"/about-us"}>About</Link>
                <Link className="text-white " to={"/services"}>Services</Link>
                {isAuth ? (
                    <>
                        <Link className="text-white " to={"/dashboard"}>Dashboard</Link>
                        <Link className="text-white " to={"/login"} onClick={logoutLink}>Logout</Link>
                    </>
                ) : (
                    <>
                        <Link className="text-white " to={"/login"}>Login</Link>
                        <Link className="text-white" to={"/register"}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};
