import {Route} from "react-router-dom";
import {jwtDecode} from 'jwt-decode'
import {useSelector} from "react-redux";
import {selectToken} from "../redux/slices/authSlice.ts";
import {CustomerDashboard} from "../customer/customerDashboard.tsx";
import {EmployeeDashboard} from "../employee/employeeDashboard.tsx";
export const DashboardSelector = () => {
    const token = useSelector(selectToken)
    const decodedToken = jwtDecode(typeof token === "string" ? token : '')

    if(decodedToken.role === "ROLE_USER") {
        return (
            <CustomerDashboard/>
        );
    }
    if(decodedToken.role === "ROLE_EMPLOYEE") {
        return (
           <EmployeeDashboard/>
        )
    }
};
