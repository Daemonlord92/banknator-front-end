import {useDispatch, useSelector} from "react-redux";
import {selectUser, setUserInformation} from "../redux/slices/userSlice.ts";
import {useFormik} from "formik";
import {jwtDecode, JwtPayload} from "jwt-decode";

interface User {
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    address:string,
    phone:number,
    creditScore:number,
    dateOfBirth:string
}

type EnhancedJwtPayload = JwtPayload & {
    userProfileId:number,
    firstName:string,
    role:string,
    ucId:number
}
export const Settings = () => {
    const dispatch = useDispatch()
    const user:User = useSelector(selectUser) as User
    const decode = jwtDecode<EnhancedJwtPayload>(sessionStorage.getItem("Authorization") || '')
    const postUpdateUser = async (data:User) => {
        const response = await fetch(`${import.meta.env.API_URL}/users/updateUser`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        dispatch(setUserInformation(result))
    }
    const formik = useFormik({
        initialValues: {
            id: decode.ucId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: '',
            address: user.address,
            phone: user.phone,
            creditScore: user.creditScore,
            dateOfBirth: user.dateOfBirth
        },
        onSubmit: (values:User) => {
            console.table(values)
            postUpdateUser(values)
            formik.resetForm()
        }
    })


    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <form className="max-w-lg mx-auto" onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        {...formik.getFieldProps("firstName")}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        {...formik.getFieldProps("lastName")}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        {...formik.getFieldProps("email")}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...formik.getFieldProps("password")}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                    </label>
                    <input
                        type="number"
                        id="phone"
                        {...formik.getFieldProps("phone")}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full remove-arrow"

                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="creditScore" className="block text-sm font-medium text-gray-700">
                        creditScore
                    </label>
                    <input
                        type="number"
                        id="creditScore"
                        {...formik.getFieldProps("creditScore")}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full remove-arrow"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                        creditScore
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        {...formik.getFieldProps("dateOfBirth")}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full remove-arrow"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                    Update Profile
                </button>
            </form>
        </div>
    );
};
