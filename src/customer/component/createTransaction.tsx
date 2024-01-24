import React from 'react';
import { Field, Form, Formik } from 'formik';

enum TransactionType {
    Withdraw = 'WITHDRAW',
    Deposit = 'DEPOSIT',
    MakePayment = 'MAKE_PAYMENT',
    Charge = 'CHARGE',
}

interface PostNewTransaction {
    fromId:number,
    toId: number,
    amount: number,
    transactionType: TransactionType
}

const CreateTransaction: React.FC = ({setDataChange}: {setDataChange: (arg0: boolean)=>void}) => {
    const initialValues:PostNewTransaction = {
        fromId: 0,
        toId: 0,
        amount: 0,
        transactionType: TransactionType.Withdraw,
    };

    const handleSubmit = async (data:PostNewTransaction, {resetForm}) => {

        const response = await fetch("http://localhost:8080/apiv1/transaction/", {
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
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="container mx-auto flex flex-wrap">
                <h2 className="text-2xl font-bold mb-4 text-end w-full">Create Transaction</h2>
                <div className="w-full flex">
                    <div className="mb-4 flex flex-row justify-end space-x-4 mx-3">
                        <div className="flex-col">
                            <label htmlFor="fromId" className="block text-sm font-medium text-gray-700">
                                From Account ID
                            </label>
                            <Field
                                type="number"
                                id="fromId"
                                name="fromId"
                                className="mt-1 p-2 border border-gray-300 rounded-md text-end remove-arrow"
                            />
                        </div>
                        <div className="flex-col">
                            <label htmlFor="toId" className="block text-sm font-medium text-gray-700">
                                To Account ID
                            </label>
                            <Field
                                type="number"
                                id="toId"
                                name="toId"
                                className="mt-1 p-2 border border-gray-300 rounded-md text-end remove-arrow"
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex flex-row justify-end space-x-4 mx-4">
                        <div className="flex-col">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                Amount
                            </label>
                            <Field
                                type="number"
                                id="amount"
                                name="amount"
                                className="mt-1 p-2 border border-gray-300 rounded-md remove-arrow text-end"
                            />
                        </div>
                        <div className="flex-col">
                            <label htmlFor="transactionType" className="block text-sm font-medium text-gray-700">
                                Transaction Type
                            </label>
                            <Field
                                as="select"
                                id="transactionType"
                                name="transactionType"
                                className="mt-1 p-2 border border-gray-300 rounded-md text-end"
                            >
                                {Object.values(TransactionType).map((type) => (
                                    <option key={type} value={type}>
                                        {type.charAt(0) + type.slice(1).toLowerCase().replace("_", " ")}
                                    </option>
                                ))}
                            </Field>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 flex-row"
                    >
                        Create Transaction
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default CreateTransaction;
