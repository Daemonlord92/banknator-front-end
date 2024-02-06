import img from '../../assets/pexels-tima-miroshnichenko-7567595.jpg';
import {Formik, Form, Field} from "formik";
import {useDispatch} from "react-redux";
import {login} from "../../redux/slices/authSlice.ts";
import {useNavigate} from "react-router-dom";

interface AuthRequest {
    email:string,
    password:string
}

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const initialValues: AuthRequest = {
        email: '',
        password: ''
    };

    async function postLogin(data:AuthRequest, {resetForm} :{resetForm:()=>void }) {
        try {
            await fetch(`${import.meta.env.API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:5173"
                },
                body: JSON.stringify(data),
            }).then( async res => {
                const result = await res.json()
                if(result.statusCode == 400) {
                    resetForm()
                    return
                }
                sessionStorage.setItem("Authorization", result.token)
                dispatch(login(result.token))
                navigate("/dashboard")
            }).catch(err => {
                window.alert(err.message())
            })

        }  catch (error) {
            console.error("Login:PostLogin:", error)
        }
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center h-5/6">
            <div className="m-10 flex space-x-10">
                <div className="hidden lg:block lg:w-1/2">
                    <img src={img} alt="Bank Image" className="object-cover w-full h-full" />
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md w-full lg:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4">Login to Your Account</h2>
                    <Formik initialValues={initialValues} onSubmit={postLogin}>
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                                <Field type="text" id="email" name="email" className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <Field type="password" id="password" name="password" className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                                Login
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>

        </div>
    );
};
