import AccountCarousel from "../shared/accountCarousel.tsx";
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAccounts} from "../redux/slices/accountSlice.ts";
import {selectTransactions} from "../redux/slices/transactionSlice.ts";
import {TransactionList} from "../shared/transactionList.tsx";
import {CreateAccount} from "./component/createAccount.tsx";
import CreateTransaction from "../shared/createTransaction.tsx";
import {setUserInformation} from "../redux/slices/userSlice.ts";
import {EnhancedJwtPayload} from "../shared/EnhancedJwtPayload.ts";
import {Link} from "react-router-dom";
import {BanknatorApi} from "../shared/banknator-api.ts";



export const CustomerDashboard = () => {
    const decode = jwtDecode<EnhancedJwtPayload>(sessionStorage.getItem("Authorization") || '')
    const dispatch = useDispatch()
    const accounts = useSelector(selectAccounts)
    const transactions = useSelector(selectTransactions)
    const [dataChange, setDataChange] = useState(false)
    const api = new BanknatorApi();

    useEffect(() => {
        setUserData(decode.userProfileId)
        api.getAllAccounts(decode.userProfileId)
    }, []);

    useEffect(() => {
        DataChange(false)
        api.getAllAccounts(decode.userProfileId)
        setUserData(decode.userProfileId)
    }, [dataChange]);

    async function setUserData(id:number) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/?id=${id}`, {
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

    const DataChange=(hasDataChanged:boolean)=> {
        setDataChange(hasDataChanged)
    }
    return (
        <>
            <div className="space-y-10">

                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 md:flex justify-between bg-blue-500 rounded-lg align-middle">
                    <h1 className="text-4xl font-medium text-start w-1/2 text-white">
                        Hi {decode.firstName}
                    </h1>
                    {decode.role == "ROLE_EMPLOYEE" ?
                        (
                            <div className="w-1/2 text-end">
                                <Link to={"/dashboard/employee"} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium" >Switch Dashboard</Link>
                            </div>
                        ) : null
                    }
                </div>
                <div className="flex align-text-top">
                    <h3 className="text-2xl font-bold text-start w-1/2">Accounts</h3>
                    <div className="text-end w-1/2"><CreateAccount id={decode.userProfileId} setDataChange={DataChange} /></div>
                </div>
                <AccountCarousel accounts={accounts} dataChange={DataChange} />
                <div className="max-w-full flex align-text-bottom">
                    <h2 className="text-2xl font-bold mb-4 text-start w-1/2">Recent Transactions</h2>
                    <CreateTransaction setDataChange={DataChange}/>
                </div>
                {transactions.length > 0 ?
                 <TransactionList transactions={transactions}/> : null}
            </div>
        </>
    );
};
