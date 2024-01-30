import {Link} from "react-router-dom";

export const EmployeeDashboard = () => {
    return (
        <>
            <Link to={"/dashboard/customer"} className="text-end" >Switch Dashboard</Link>
        </>
    );
};
