import img from "../../assets/pexels-liliana-drew-8554373.jpg";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {login} from "../../redux/slices/authSlice.ts";
import {useNavigate} from "react-router-dom";

interface PostNewUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phone: bigint,
    creditScore: number,
    dateOfBirth: string
}

export const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            phone: 0n,
            creditScore: 0,
            dateOfBirth: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
            address: Yup.string().required('Required'),
            phone: Yup.number().required('Required'),
            creditScore: Yup.number().required('Required'),
            dateOfBirth: Yup.date().required('Required'),
        }),
        onSubmit: (values:PostNewUser) => {

            async function postRegistration(data:PostNewUser) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "http://localhost:5173"
                        },
                        body: JSON.stringify(data),
                    });
                    const result = await response.json();
                    sessionStorage.setItem("Authorization", result.token)
                    dispatch(login(result.token))
                    navigate("/login")
                }  catch (error) {
                    console.error("Login:PostLogin:", error)
                }
            }
            postRegistration(values);
        },
    })

    return (
        <div className="bg-gray-100 flex items-center justify-center h-5/6">
            <div className="bg-white p-8 rounded-lg shadow-md w-3/4 lg:flex m-10 space-x-10">
                <form className="lg:w-1/2" onSubmit={formik.handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-4">Register for an Account</h2>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        <input type="text"
                               id="firstName"
                               className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" {...formik.getFieldProps("firstName")} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <input type="text" id="lastName" {...formik.getFieldProps("lastName")} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input type="email" id="email" {...formik.getFieldProps("email")} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" id="password" {...formik.getFieldProps("password")} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                        <input type="text" id="address" {...formik.getFieldProps("address")} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                        <input type="number" id="phone" {...formik.getFieldProps("phone")} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 remove-arrow" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="creditScore" className="block text-gray-700 text-sm font-bold mb-2">Credit Score</label>
                        <input type="number" id="creditScore" {...formik.getFieldProps("creditScore")} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
                        <input type="date" id="dateOfBirth" {...formik.getFieldProps("dateOfBirth")} className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                        Register
                    </button>
                </form>
                <div className="hidden lg:block lg:w-1/2">
                    <img src={img} alt="Registration Image" className="object-cover w-full h-full" />
                </div>
            </div>

        </div>
    );
};
