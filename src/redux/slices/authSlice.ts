import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface AuthState {
    token: string | null,
    isAuthenticated: boolean
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null

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

export default authSlice.reducer