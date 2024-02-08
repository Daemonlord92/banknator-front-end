import {Link} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {EnhancedJwtPayload} from "../../../shared/EnhancedJwtPayload.ts";
import {EmployeeNavbar} from "../../../nav/EmployeeNavbar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectUsers, setUsers} from "../../../redux/slices/userSlice.ts";
import {useEffect} from "react";

export const TellerSystem = ({setView}:{setView:(arg:string) => void}) => {
    const dispatch = useDispatch()
    const decode = jwtDecode<EnhancedJwtPayload>(sessionStorage.getItem("Authorization") || '')
    const customers = useSelector(selectUsers)

    useEffect(() => {
        fetchUser()
    }, []);

    const fetchUser = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/users/getAllUser`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
            }
        }).then(res => res.json())
            .then(data => {
                dispatch(setUsers(data))
            })
            .catch(err => console.error(err))
    }

    return (
        <>
            {decode.position != "TELLER"? (
                <EmployeeNavbar setView={setView}/>
            ) : (<Link to={"/dashboard/customer"} className="text-end" >Switch Dashboard</Link>)}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Bank Teller Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {customers?.map(customer => (
                        <div key={customer.userId} className="bg-white shadow rounded-lg p-4">
                            <h2 className="text-xl font-semibold mb-2">Name: {customer.firstName + " " + customer.lastName}</h2>
                            <p className="text-gray-600">{`Credit Score: ${customer.creditScore}`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
