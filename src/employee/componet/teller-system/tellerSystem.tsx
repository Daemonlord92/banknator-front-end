import {Link} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {EnhancedJwtPayload} from "../../../shared/EnhancedJwtPayload.ts";
import {EmployeeNavbar} from "../../../nav/EmployeeNavbar.tsx";

export const TellerSystem = ({setView}:{setView:(arg:string) => void}) => {
    const decode = jwtDecode<EnhancedJwtPayload>(sessionStorage.getItem("Authorization") || '')
    return (
        <>
            {decode.position != "TELLER"? (
                <EmployeeNavbar setView={setView}/>
            ) : (<Link to={"/dashboard/customer"} className="text-end" >Switch Dashboard</Link>)}
            tell
        </>
    );
};
