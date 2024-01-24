import {FC, useState} from 'react';
import { useTrail, animated } from '@react-spring/web';

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
    const [showOlder, setShowOlder] = useState(false);

    const trail = useTrail(transactions.length, {
        opacity: showOlder ? 0 : 1,
        transform: showOlder ? 'translate3d(0,0px,0)' : 'translate3d(0,20px,0)',
    });

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
                <tbody>
                {trail.map((style, index) => (
                    <animated.tr key={index} style={style} className="m-4 hover:border-separate">
                            <td className="text-md">{new Date(transactions[index].createdAt).toDateString()}</td>
                            {transactions[index].fromId > 0 ?
                                (<td className="text-md">{transactions[index].fromId}</td>): <td></td>}
                            <td className="text-md">{transactions[index].toId}</td>

                            <td className="text-md">{transactions[index].transactionType.charAt(0) + transactions[index].transactionType.slice(1).toLowerCase()}</td>
                            <td className="text-md">{transactions[index].transactionStatus.charAt(0) + transactions[index].transactionStatus.slice(1).toLowerCase()}</td>
                            <td className="text-lg font-bold">${transactions[index].amount}</td>
                    </animated.tr>
                ))}
                </tbody>
            </table>
            {transactions.length > 3 && (
                <button
                    className="text-blue-500 mt-2 cursor-pointer"
                    onClick={() => setShowOlder(!showOlder)}
                >
                    {showOlder ? 'Show Less' : 'Show Older Transactions'}
                </button>
            )}
        </div>
    );
}