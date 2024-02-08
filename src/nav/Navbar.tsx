import {Link} from "react-router-dom";
import logo from '../assets/logo-transparent-png.png'

import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, logout} from "../redux/slices/authSlice.ts";
import {clearAccount} from "../redux/slices/accountSlice.ts";
import {clearTransactions} from "../redux/slices/transactionSlice.ts";
import {clearHirApp} from "../redux/slices/hiringSlice.ts";
import {clearUser} from "../redux/slices/userSlice.ts";
import {jwtDecode} from "jwt-decode";
import {EnhancedJwtPayload} from "../shared/EnhancedJwtPayload.ts";
import {EmployeeDropdown} from "./EmployeeDropdown.tsx";

export const Navbar = () => {
    let decode: EnhancedJwtPayload | null;
    const isAuth = useSelector(selectIsAuth)
    if (isAuth) {
        decode = jwtDecode<EnhancedJwtPayload>(sessionStorage.getItem("Authorization") || '') || null;
    }
    const dispatch = useDispatch()
    const logoutLink = () => {
        sessionStorage.removeItem("Authorization")
        dispatch(clearAccount())
        dispatch(clearTransactions())
        dispatch(clearHirApp())
        dispatch(clearUser())
        dispatch(logout())
    }

    return (
        <nav className="fixed top-0 left-0 z-20 w-full p-4 bg-blue-500 text-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
            <Link  to="/" className="text-white font-bold text-xl">
                <img src={logo} alt="Banknator Logo" className="z-20 max-w-48 "/>
            </Link>

            <div className="space-x-4 flex flex-row">
                <Link className="text-white " to={"/"}>Home</Link>
                <Link className="text-white " to={"/about-us"}>About</Link>
                <Link className="text-white " to={"/services"}>Services</Link>
                {!isAuth ? (
                    <>
                        <Link className="text-white " to={"/login"}>Login</Link>
                        <Link className="text-white" to={"/register"}>Register</Link>
                    </>
                ) : (
                    <>
                        <Link to={"/hiringDashboard"} className="text-white">Job Center</Link>
                        <Link to={"/settings"} className="text-white ">Settings</Link>
                        { decode?.role == "ROLE_EMPLOYEE" ?
                            (
                                <>
                                    <EmployeeDropdown/>
                                </>
                            ):(
                                <>
                                    <Link className="text-white " to={"/dashboard"}>Dashboard</Link>
                                </>)

                        }
                        <Link className="text-white " to={"/login"} onClick={logoutLink}>Logout</Link>
                    </>

                )}
            </div>
        </nav>
    );
};
