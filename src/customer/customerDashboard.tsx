import AccountCarousel from "./component/accountCarousel.tsx";
import {Link} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllAccount, selectAccounts} from "../redux/slices/accountSlice.ts";

export const CustomerDashboard = () => {

    const decode = jwtDecode(sessionStorage.getItem("Authorization") || '')
    const dispatch = useDispatch()

    const accounts = useSelector(selectAccounts)
    useEffect(() => {
        async function getAllAccounts(id:number) {
            const response = await fetch("http://localhost:8080/apiv1/account/getAccountInformationByUser?id="+id,{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:5173",
                    "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
                }
            })
            const result = await response.json()
            dispatch(getAllAccount(result))
        }
        getAllAccounts(decode.userProfileId)
    }, [])

    return (
        <>
            <div className="space-y-10">
                <div>
                    <h1 className="text-4xl font-medium text-start">
                        Hi {decode.firstName}
                    </h1>
                </div>
                <div className="flex align-text-top">
                    <h3 className="text-2xl font-bold text-start w-1/2">Accounts</h3>
                    <Link to={"/createAccount"} className="text-end w-1/2">Create Account</Link>
                </div>
                <AccountCarousel accounts={accounts} />
            </div>
        </>
    );
};
