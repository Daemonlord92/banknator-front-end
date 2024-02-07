import AccountCarousel from "./component/accountCarousel.tsx";
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllAccount, selectAccounts} from "../redux/slices/accountSlice.ts";
import {getAllTransactionsByAccountNumber, selectTransactions} from "../redux/slices/transactionSlice.ts";
import {TransactionList} from "./component/transactionList.tsx";
import {CreateAccount} from "./component/createAccount.tsx";
import CreateTransaction from "./component/createTransaction.tsx";
import {setUserInformation} from "../redux/slices/userSlice.ts";
import {EnhancedJwtPayload} from "../shared/EnhancedJwtPayload.ts";
import {Link} from "react-router-dom";


export const CustomerDashboard = () => {
    const decode = jwtDecode<EnhancedJwtPayload>(sessionStorage.getItem("Authorization") || '')
    const dispatch = useDispatch()
    const accounts = useSelector(selectAccounts)
    const transactions = useSelector(selectTransactions)
    const [dataChange, setDataChange] = useState(false)
    async function getAllAccounts(id:number) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/account/getAccountInformationByUser?id=${id}`,{
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

    useEffect(() => {
        setUserData(decode.userProfileId)
    }, []);

    useEffect(() => {
        DataChange(false)
        getAllAccounts(decode.userProfileId)
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

    const setTransactions= async (id:number) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/transaction/${id}`,
            {
                method:'GET',
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:5173",
                    "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
                }
            })
        const result = await response.json()
        dispatch(getAllTransactionsByAccountNumber(result))
        DataChange(true)
    }
    const disableAccount = async (id:number) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/account/disableAccount?id=${id}`,
            {
                method:'PUT',
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:5173",
                    "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
                }
            })
        const result = await response.json()
        window.alert(result.message)
        DataChange(true)
    }
    const DataChange=(hasDataChanged:boolean)=> {
        setDataChange(hasDataChanged)
    }
    return (
        <>
            <div className="space-y-10">

                <div className="flex align-text-top">
                    <h1 className="text-4xl font-medium text-start w-1/2">
                        Hi {decode.firstName}
                    </h1>
                    {decode.role == "ROLE_EMPLOYEE" ?
                        (
                            <>
                                <Link to={"/dashboard/employee"} className="text-end w-1/2" >Switch Dashboard</Link>
                            </>
                        ) : null
                    }
                </div>
                <div className="flex align-text-top">
                    <h3 className="text-2xl font-bold text-start w-1/2">Accounts</h3>
                    <div className="text-end w-1/2"><CreateAccount id={decode.userProfileId} setDataChange={DataChange} /></div>
                </div>
                <AccountCarousel accounts={accounts} setTransactions={setTransactions} disableAccount={disableAccount} />
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
