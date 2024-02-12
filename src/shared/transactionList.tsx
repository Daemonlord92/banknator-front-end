import {FC} from 'react';
import { animated } from '@react-spring/web';

interface Transaction {
    fromId: number;
    toId: number;
    amount: number;
    transactionType: string;
    transactionStatus:string;
    createdAt: string;
}

interface TransactionsProps {
    transactions: Transaction[];
}

export const TransactionList:FC<TransactionsProps> = ({transactions}) => {

    return (
        <div>
            <table className="table-fixed p-3 rounded-md w-full">
                <thead className="space-y-10">
                    <tr>
                        <th>Date</th>
                        <th>From Id</th>
                        <th>To Id</th>
                        <th>Transaction Type</th>
                        <th>Transaction Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody className="max-h-96 overflow-y-auto">
                {transactions.map((transaction, index) => (
                    <animated.tr key={index}  className="m-4 hover:border-separate">
                            <td className="text-md">{new Date(transaction.createdAt).toDateString()}</td>
                            {transactions[index].fromId > 0 ?
                                (<td className="text-md">{transaction.fromId}</td>): <td></td>}
                            <td className="text-md">{transaction.toId}</td>

                            <td className="text-md">{transaction.transactionType.charAt(0) + transactions[index].transactionType.slice(1).toLowerCase().replace("_", " ")}</td>
                            <td className="text-md">{transaction.transactionStatus.charAt(0) + transactions[index].transactionStatus.slice(1).toLowerCase()}</td>
                            <td className="text-lg font-bold">${transaction.amount}</td>
                    </animated.tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}