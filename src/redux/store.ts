import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.ts";
import accountSlice from "./slices/accountSlice.ts";
import transactionSlice from "./slices/transactionSlice.ts";
import userSlice from "./slices/userSlice.ts";
import hiringSlice from "./slices/hiringSlice.ts";

const store = configureStore({
    reducer: {
        auth: authSlice,
        account: accountSlice,
        transaction: transactionSlice,
        user: userSlice,
        hiring: hiringSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store