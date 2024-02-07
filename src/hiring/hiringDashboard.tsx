import {useEffect, useState} from "react";
import ApplicationTable from "./components/ApplicationTable.tsx";
import {jwtDecode} from "jwt-decode";
import {useDispatch, useSelector} from "react-redux";
import {EnhancedJwtPayload} from "../shared/EnhancedJwtPayload.ts";
import {selectHiring, storeAllHiringApps} from "../redux/slices/hiringSlice.ts";
import {HiringForm} from "./components/hiringForm.tsx";



export const HiringDashboard = () => {
    const [dataChange, setDataChange ] = useState(false);
    const decode = jwtDecode<EnhancedJwtPayload>(sessionStorage.getItem("Authorization") || '')
    const dispatch = useDispatch()
    const hiringApps = useSelector(selectHiring)
    const fetchHiringData = async (id:number) => {
        await fetch(`${import.meta.env.API_URL}/hireapp/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
            }
        }).then((res) => res.json())
            .then((data) => dispatch(storeAllHiringApps(data)))
            .catch(err => window.alert(err))
    }

    useEffect(() => {
        DataChange(false)
        fetchHiringData(decode.userProfileId)
    }, [dataChange]);

    const DataChange=(hasDataChanged:boolean)=> {
        setDataChange(hasDataChanged)
    }

    return (
        <>
            <div className="w-full">
                <h1 className="text-2xl font-bold mb-4">Applications</h1>
                <ApplicationTable applications={hiringApps.hiringApps}/>
            </div>
            <div>
                <h3 className="text-lg font-bold mb-4">New Application</h3>
                <HiringForm setDataChange={DataChange}/>
            </div>
        </>
    );
};
