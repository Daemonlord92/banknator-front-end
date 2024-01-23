import {useSelector} from "react-redux";
import {selectIsAuth} from "../redux/slices/authSlice.ts";
import { Navigate} from "react-router-dom";



export const ProtectedRoute = (x) => {
    const isAuth = useSelector(selectIsAuth)
   return isAuth ? x.children : <Navigate to={"/login"} />
};
