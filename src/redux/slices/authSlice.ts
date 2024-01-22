import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface AuthState {
    token: string | null,
    isAuthenticated: boolean,
    role: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    role: ''

}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login:(state, action: PayloadAction<string>) => {
            state.token = action.payload
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.token = null
            state.isAuthenticated = false
        }
    }
})

export const { login, logout } =authSlice.actions
export const selectToken = (state: { auth:AuthState}) => state.auth.token
export const selectIsAuth = (state: { auth:AuthState}) => state.auth.isAuthenticated
export const selectRole = (state: { auth:AuthState}) => state.auth.role

export default authSlice.reducer