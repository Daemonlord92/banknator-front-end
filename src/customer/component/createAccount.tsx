import {Field, Form, Formik, FormikValues} from "formik";

interface PostNewAccountInformation {
    userProfileId:number,
    accountType:string,
    balance:number
}

export const CreateAccount = ({id, setDataChange}:{id:number, setDataChange: (arg0: boolean)=>void }) => {

    const initialValues:PostNewAccountInformation = {userProfileId: id, accountType: "", balance:0.0}
    const handleCreateAccount = async (data:PostNewAccountInformation, {resetForm}) => {
        const response = await fetch("http://localhost:8080/apiv1/account/createNewAccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Authorization": "Bearer "+sessionStorage.getItem("Authorization")
            },
            body: JSON.stringify(data),
        })
        const result = await response.json();
        window.alert(result.message)
        resetForm()
        setDataChange(true)
    };
    return (
        <Formik initialValues={initialValues} onSubmit={handleCreateAccount}>
            <Form className="container mx-auto" >
                <h2 className="text-2xl font-bold mb-4">Create Account</h2>
                <div className="mb-4">
                    <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">
                        Account Type
                    </label>
                    <Field
                        as="select"
                        id="accountType"
                        name="accountType"
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    >
                        <option value="">Select Account Type</option>
                        <option value="CHECKING">Checking</option>
                        <option value="SAVING">Saving</option>
                        <option value="CREDIT">Credit</option>
                    </Field>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Create Account
                </button>
            </Form>
        </Formik>
    );
};
