import {Link} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {EnhancedJwtPayload} from "../../../shared/EnhancedJwtPayload.ts";
import {EmployeeNavbar} from "../../../nav/EmployeeNavbar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {selectUsers, setUsers} from "../../../redux/slices/userSlice.ts";
import {useEffect, useState} from "react";
import AccountCarousel from "../../../shared/accountCarousel.tsx";
import {selectAccounts} from "../../../redux/slices/accountSlice.ts";
import {BanknatorApi} from "../../../shared/banknator-api.ts";
import {clearTransactions, selectTransactions} from "../../../redux/slices/transactionSlice.ts";
import {TransactionList} from "../../../shared/transactionList.tsx";
import CreateTransaction from "../../../shared/createTransaction.tsx";

export const TellerSystem = ({setView}:{setView:(arg:string) => void}) => {
    const dispatch = useDispatch()
    const decode = jwtDecode<EnhancedJwtPayload>(sessionStorage.getItem("Authorization") || '')
    const [dataChange, setDataChange] = useState(false)
    const customers = useSelector(selectUsers)
    const accounts = useSelector(selectAccounts)
    const transaction = useSelector(selectTransactions)
    const api = new BanknatorApi()

    useEffect(() => {
        DataChange(false)
        fetchUser()
    }, [dataChange]);

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

    const DataChange=(hasDataChanged:boolean)=> {
        setDataChange(hasDataChanged)
    }

    return (
        <>
            {decode.position != "TELLER"? (
                <EmployeeNavbar setView={setView}/>
            ) : (<Link to={"/dashboard/customer"} className="text-end" >Switch Dashboard</Link>)}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Bank Teller Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
                    {customers?.map(customer => (
                        <div key={customer.userId} onClick={() => {
                            dispatch(clearTransactions())
                            api.getAllAccounts(customer.userId)
                        }} className=" shadow rounded-lg p-4 hover:cursor-pointer bg-gray-200">
                            <h2 className="text-xl font-semibold mb-2">Name: {customer.firstName + " " + customer.lastName}</h2>
                            <p className="text-gray-600">{`Credit Score: ${customer.creditScore}`}</p>
                        </div>
                    ))}
                </div>
                <AccountCarousel accounts={accounts} dataChange={DataChange} />
                <div className="my-5">
                    <CreateTransaction setDataChange={DataChange} />
                </div>
                <div className="my-5">
                    <TransactionList transactions={transaction} />
                </div>
            </div>
        </>
    );
};
