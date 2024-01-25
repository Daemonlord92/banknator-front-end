import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface User {
    userId:number,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    address:string,
    phone:number,
    creditScore:number,
    dateOfBirth:string
}

interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUserInformation:(state, action:PayloadAction<User>) => {
            state.user = action.payload
        },
        clearUser:(state) => {
            state.user = null
        }
    }
})

export const { setUserInformation, clearUser } = userSlice.actions

export const selectUser = (state: { user:UserState}) => state.user.user

export default userSlice.reducer