import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface Transaction {
    fromId: number;
    toId: number;
    amount: number;
    transactionType: string;
    transactionStatus:string;
    createdAt: string;
}

interface TransactionState {
    transactions: Transaction[]
}

const initialState: TransactionState = {
    transactions: []
}

const transactionSlice = createSlice({
    name:'transaction',
    initialState,
    reducers: {
        getAllTransactionsByAccountNumber:(state, action: PayloadAction<Transaction[]>) => {
            state.transactions = action.payload
        },
        clearTransactions:(state) => {
            state.transactions = []
        }
    }
})

export const { getAllTransactionsByAccountNumber, clearTransactions} = transactionSlice.actions

export const selectTransactions = (state: { transaction:TransactionState}) => state.transaction.transactions

export default  transactionSlice.reducer