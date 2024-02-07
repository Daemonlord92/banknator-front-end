import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BankStatus} from "../../shared/BankStatus.ts";

export interface Bank {
    id:number,
    name:string,
    balance:number,
    bankStatus:BankStatus
}

interface BankState {
    banks: Bank[]
}

const initialState:BankState = {
    banks: []
}

const bankSlice = createSlice({
    name:'bank',
    initialState,
    reducers: {
        storeAllBanks:(state, action:PayloadAction<Bank[]>) => {
            state.banks = action.payload
        },
        clearBank:(state) => {
            state.banks = []
        }
    }
})

export const { storeAllBanks, clearBank } = bankSlice.actions

export const selectBank = (state: {bank:BankState}) => state.bank

export default bankSlice.reducer