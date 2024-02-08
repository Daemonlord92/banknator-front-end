import {BankPosition} from "../enum/BankPosition.ts";
import React, {useEffect} from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {selectBank, storeAllBanks} from "../../redux/slices/bankSlice.ts";
import {jwtDecode} from "jwt-decode";
import {EnhancedJwtPayload} from "../../shared/EnhancedJwtPayload.ts";

interface HiringFormProps {
    setDataChange: (arg:boolean) => void
}

interface PostNewHireApp {
    bankId:number,
    position:BankPosition,
    requestedSalary:number,
    userProfileId:number
}

export const HiringForm: React.FC<HiringFormProps> = ({setDataChange}) => {
    const dispatch = useDispatch()
    const banks = useSelector(selectBank)
    const decode = jwtDecode<EnhancedJwtPayload>(sessionStorage.getItem("Authorization") || '')
    useEffect(() => {
        fetchBankInfo()
    }, []);

    const formik = useFormik({
        initialValues: {
            bankId: 0,
            position:BankPosition.TELLER,
            requestedSalary:0,
            userProfileId: decode.userProfileId
        },
        onSubmit: (values:PostNewHireApp) => {
            postHiringApp(values)
            setDataChange(true)
            formik.resetForm()
        }
    })

    const postHiringApp = async (data:PostNewHireApp) => {
        await fetch(`${import.meta.env.VITE_API_URL}/hireapp/`, {
            method:'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(r => alert(r.message))
            .catch(err => alert(err))

    }

    const fetchBankInfo = async () => {
        await fetch(`${import.meta.env.VITE_API_URL}/bank/`, {
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
            }
        }).then(res => res.json())
            .then(data => dispatch(storeAllBanks(data)))
            .catch(err => alert(err))
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <label htmlFor="bankId">Bank:</label>
                    <select id="bankId" className="flex-1 p-2 border border-gray-300 rounded-md" {...formik.getFieldProps("bankId")}>
                        <option value={0}>Please select a bank</option>
                        {banks.banks.map(bank => (
                            <option key={bank.id} value={bank.id}>
                                {bank.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="position" className="min-w-[100px]">
                        Position:
                    </label>
                    <select
                        id="position"
                        {...formik.getFieldProps("position")}
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                    >
                        {Object.values(BankPosition).map((position) => (
                            <option key={position} value={position}>
                                {position}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-4">
                    <label htmlFor="requestedSalary" className="min-w-[100px]">
                        Requested Salary:
                    </label>
                    <input
                        type="number"
                        id="requestedSalary"
                        {...formik.getFieldProps("requestedSalary")}
                        className="flex-1 p-2 border border-gray-300 rounded-md text-end remove-arrow"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </>
    );
};
