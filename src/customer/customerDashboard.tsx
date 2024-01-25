import AccountCarousel from "./component/accountCarousel.tsx";
import {jwtDecode} from "jwt-decode";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllAccount, selectAccounts} from "../redux/slices/accountSlice.ts";
import {getAllTransactionsByAccountNumber, selectTransactions} from "../redux/slices/transactionSlice.ts";
import {TransactionList} from "./component/transactionList.tsx";
import {CreateAccount} from "./component/createAccount.tsx";
import CreateTransaction from "./component/createTransaction.tsx";

export const CustomerDashboard = () => {
    const decode = jwtDecode(sessionStorage.getItem("Authorization") || '')
    const dispatch = useDispatch()
    const accounts = useSelector(selectAccounts)
    const transactions = useSelector(selectTransactions)
    const [dataChange, setDataChange] = useState(false)
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
    useEffect(() => {
        DataChange(false)
        getAllAccounts(decode.userProfileId)
    }, [dataChange]);

    const setTransactions= async (id:number) => {
        const response = await fetch("http://localhost:8080/apiv1/transaction/"+id,
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
    }
    const DataChange=(hasDataChanged:boolean)=> {
        setDataChange(hasDataChanged)
    }
    return (
        <>
            <div className="space-y-10">
                <script hidden={true}>0</script>
                <div>
                    <h1 className="text-4xl font-medium text-start">
                        Hi {decode.firstName}
                    </h1>
                </div>
                <div className="flex align-text-top">
                    <h3 className="text-2xl font-bold text-start w-1/2">Accounts</h3>
                    <div className="text-end w-1/2"><CreateAccount id={decode.userProfileId} setDataChange={DataChange}/></div>
                </div>
                <AccountCarousel accounts={accounts} setTransactions={setTransactions} setDataChange={DataChange}/>
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
