import {Link} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {EnhancedJwtPayload} from "../shared/EnhancedJwtPayload.ts";

export const EmployeeNavbar = ({setView}:{setView:(arg:string) => void}) => {
    const decode = jwtDecode<EnhancedJwtPayload>(sessionStorage.getItem("Authorization") || '')
    return (
        <div className="">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 md:flex justify-between align-text-bottom bg-blue-500 rounded-lg">
                <Link
                    to={"#"}
                    onClick={() => setView("teller")}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                    Teller
                </Link>
                <Link
                    to={"#"}
                    onClick={() => setView("management")}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                    Management
                </Link>
                {(decode.position == "HUMAN_RESOURCE" || decode.position == "ASSISTANT_MANAGER" || decode.position == "GENERAL_MANAGER" || decode.position == "IT_SUPPORT" || decode.position == "CFO" || decode.position == "CTO" || decode.position == "CEO") ? (
                    <Link
                        to={"#"}
                        onClick={() => setView("hr")}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Human Resources
                    </Link>
                ) : null}
                <Link to={"/dashboard/customer"} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-end" >Switch Dashboard</Link>
            </div>
        </div>
    );
};
