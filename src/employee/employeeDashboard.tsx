import {Link} from "react-router-dom";
import {setUserInformation} from "../redux/slices/userSlice.ts";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {EnhancedJwtPayload} from "../shared/EnhancedJwtPayload.ts";
import {useDispatch} from "react-redux";

export const EmployeeDashboard = () => {
    const decode = jwtDecode<EnhancedJwtPayload>(sessionStorage.getItem("Authorization") || '')
    const dispatch = useDispatch()
    useEffect(() => {
        setUserData(decode.userProfileId)
    }, []);

    async function setUserData(id:number) {
        const response = await fetch("http://localhost:8080/apiv1/users/?id="+id, {
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
            }
        })
        const result = await response.json()
        dispatch(setUserInformation(result))
    }
    return (
        <>
            <Link to={"/dashboard/customer"} className="text-end" >Switch Dashboard</Link>
        </>
    );
};
