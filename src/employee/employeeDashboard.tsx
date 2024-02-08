import {setUserInformation} from "../redux/slices/userSlice.ts";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {EnhancedJwtPayload} from "../shared/EnhancedJwtPayload.ts";
import {useDispatch} from "react-redux";
import {TellerSystem} from "./componet/teller-system/tellerSystem.tsx";
import {ManagementSystem} from "./componet/management-system/managementSystem.tsx";
import {HrSystem} from "./componet/hr-system/hrSystem.tsx";

export const EmployeeDashboard = () => {
    const decode = jwtDecode<EnhancedJwtPayload>(sessionStorage.getItem("Authorization") || '')
    const dispatch = useDispatch()
    const [view, setView] = useState("teller")
    useEffect(() => {
        setUserData(decode.userProfileId)
    }, [view]);

    async function setUserData(id:number) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/?id=${id}`, {
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
            }
        })
        const result = await response.json()
        dispatch(setUserInformation(result))
    }
    return (
        <>
            {(() => {
                if(view == "teller") {
                    return (
                            <TellerSystem setView={setView} />
                    )
                } else if (view == "management") {
                    return (
                            <ManagementSystem  setView={setView}/>
                    )
                } else if (view == "hr") {
                    return (
                            <HrSystem setView={setView} />
                    )
                } else {
                    return (
                        <>
                            Error has occurred please refresh the application
                        </>
                    )
                }
            })()}
        </>
    );
};
