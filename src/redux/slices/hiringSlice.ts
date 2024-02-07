import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BankPosition} from "../../hiring/enum/BankPosition.ts";
import {ApplicationStatus} from "../../shared/ApplicationStatus.ts";

export interface HiringApp {
    id:number,
    bankId:number,
    bankPosition:BankPosition,
    requestedSalary:number,
    applicationStatus:ApplicationStatus
}

interface HiringState {
    hiringApps: HiringApp[]
}

const initialState: HiringState = {
    hiringApps: []
}

const hiringSlice = createSlice({
    name:'hiring',
    initialState,
    reducers: {
        storeAllHiringApps:(state, action:PayloadAction<HiringApp[]>) => {
            state.hiringApps = action.payload
        },
        clearHirApp:(state) => {
            state.hiringApps = []
        }
    }
})

export const { storeAllHiringApps, clearHirApp } = hiringSlice.actions

export const  selectHiring = (state: { hiring:HiringState}) => state.hiring

export default hiringSlice.reducer