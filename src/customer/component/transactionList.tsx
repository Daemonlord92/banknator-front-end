import {FC, useState} from 'react';
import { useTrail, animated } from '@react-spring/web';

interface Transaction {
    fromId: number;
    toId: number;
    amount: number;
    transactionType: string;
    transactionStatus:string;
    date: string;
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
            <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
            {trail.map((style, index) => (
                <animated.div key={index} style={style} className="mb-2">
                    <div className="border p-3 rounded-md">
                        <p className="text-sm text-gray-500">{transactions[index].date}</p>
                        {transactions[index].fromId > 0 ?
                            (<p className="text-md">From Account Number: {transactions[index].fromId}</p>): null}
                        <p className="text-md">To Account Number: {transactions[index].toId}</p>
                        <p className="text-md">Transaction Type: {transactions[index].transactionType.charAt(0) + transactions[index].transactionType.slice(1).toLowerCase()}</p>
                        <p className="text-md">Transaction Status: {transactions[index].transactionStatus.charAt(0) + transactions[index].transactionStatus.slice(1).toLowerCase()}</p>
                        <p className="text-lg font-bold">Amount: ${transactions[index].amount}</p>
                    </div>
                </animated.div>
            ))}
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