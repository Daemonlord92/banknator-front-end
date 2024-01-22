import {useSelector} from "react-redux";
import {selectIsAuth} from "../redux/slices/authSlice.ts";
import { Navigate} from "react-router-dom";



export const ProtectedRoute = ({children}) => {
    const isAuth = useSelector(selectIsAuth)
   return isAuth ? children : <Navigate to={"/login"} />
};
