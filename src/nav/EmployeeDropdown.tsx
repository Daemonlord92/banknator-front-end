import { Link } from "react-router-dom";
import {useState} from "react";

export const EmployeeDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            <div className="relative">
                <div
                    onClick={toggleDropdown}
                    className="text-white cursor-pointer"
                >
                   Dashboards
                </div>
                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                        >
                            <Link
                                to="/dashboard/employee"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                Employee Dashboard
                            </Link>
                            <Link
                                to="/dashboard/customer"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                Customer Dashboard
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
