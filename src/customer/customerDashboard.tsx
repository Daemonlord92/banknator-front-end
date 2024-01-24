import AccountCarousel from "./component/accountCarousel.tsx";
import {Link} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllAccount, selectAccounts} from "../redux/slices/accountSlice.ts";
import {getAllTransactionsByAccountNumber, selectTransactions} from "../redux/slices/transactionSlice.ts";
import {TransactionList} from "./component/transactionList.tsx";

export const CustomerDashboard = () => {

    const decode = jwtDecode(sessionStorage.getItem("Authorization") || '')
    const dispatch = useDispatch()

    const accounts = useSelector(selectAccounts)
    const transactions = useSelector(selectTransactions)
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
        console.table(result)
        dispatch(getAllTransactionsByAccountNumber(result))
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
                    <Link to={"/createAccount"} className="text-end w-1/2">Create Account</Link>
                </div>
                <AccountCarousel accounts={accounts} setTransactions={setTransactions}/>
                <div className="max-w-full flex align-text-bottom">
                    <h2 className="text-2xl font-bold mb-4 text-start w-1/2">Recent Transactions</h2>
                    <Link to={"/newTransaction"} className="text-end w-1/2">Create new transaction</Link>
                </div>
                {transactions.length > 0 ?
                 <TransactionList transactions={transactions}/> : null}
            </div>
        </>
    );
};
