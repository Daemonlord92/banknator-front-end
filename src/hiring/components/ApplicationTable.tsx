import {HiringApp} from "../../redux/slices/hiringSlice.ts";
import React from "react";


interface ApplicationTableProps {
    applications: HiringApp[];
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({ applications}) => {
    return (
        <div className="container mx-auto">
            {applications.length > 0 ? (
                <table className="table-auto w-full">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Bank ID</th>
                        <th className="px-4 py-2">Bank Position</th>
                        <th className="px-4 py-2">Requested Salary</th>
                        <th className="px-4 py-2">Application Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {applications.map(application => (
                        <tr key={application.id}>
                            <td className="border px-4 py-2">{application.id}</td>
                            <td className="border px-4 py-2">{application.bankId}</td>
                            <td className="border px-4 py-2">{application.bankPosition.charAt(0) + application.bankPosition.slice(1).toLowerCase().replace("_", " ")}</td>
                            <td className="border px-4 py-2">{application.requestedSalary}</td>
                            <td className="border px-4 py-2">{application.applicationStatus.charAt(0) + application.applicationStatus.slice(1).toLowerCase()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center mt-4">No applications found. Turn in an application today!</p>
            )}
        </div>
    );
};

export default ApplicationTable;