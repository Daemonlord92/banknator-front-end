import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface User {
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
    users: User[] | null
}

const initialState: UserState = {
    user: null,
    users: []
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {

        setUsers:(state, action:PayloadAction<User[]>) => {
            state.users = action.payload
        },

        setUserInformation:(state, action:PayloadAction<User>) => {
            state.user = action.payload
        },
        clearUser:(state) => {
            state.user = null
        }
    }
})

export const { setUsers, setUserInformation, clearUser } = userSlice.actions

export const selectUser = (state: { user:UserState}) => state.user.user

export const selectUsers = (state: {user:UserState}) => state.user.users

export default userSlice.reducer