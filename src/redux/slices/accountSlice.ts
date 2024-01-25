import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Account {
    accountId: number,
    accountType:string,
    balance:number,
    minPay:number,
    interestRate:number,
    isActive:boolean
}
interface AccountState {
    accounts:Account[]
}

const initialState: AccountState = {
    accounts: []
}

const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers: {
        getAllAccount:(state, action: PayloadAction<Account[]>) => {
            state.accounts = action.payload
        },
        clearAccount:(state) => {
            state.accounts = []
        }
    }
})

export const { getAllAccount, clearAccount } = accountSlice.actions

export const selectAccounts = (state: { account:AccountState}) => state.account.accounts

export default  accountSlice.reducer