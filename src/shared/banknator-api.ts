import {useDispatch} from "react-redux";
import {getAllAccount} from "../redux/slices/accountSlice.ts";
import {getAllTransactionsByAccountNumber} from "../redux/slices/transactionSlice.ts";
import {PostNewTransaction} from "./PostNewTransaction.ts";


export class BanknatorApi {
    private dispatch = useDispatch()

    public async getAllAccounts(id:number):Promise<void> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/account/getAccountInformationByUser?id=${id}`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
            }
        })
        const result = await response.json()
        this.dispatch(getAllAccount(result))
    }

    async setTransactions(id:number, DataChange:(arg:boolean) => void){
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
        this.dispatch(getAllTransactionsByAccountNumber(result))
        DataChange(true)
    }

    async disableAccount(id:number,  DataChange:(arg:boolean) => void) {
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

    async createTransaction(data:PostNewTransaction) {
        return await fetch(`${import.meta.env.VITE_API_URL}/transaction/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
            },
            body: JSON.stringify(data),
        })
    }
}