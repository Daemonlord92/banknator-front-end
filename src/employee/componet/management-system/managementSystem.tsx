import {EmployeeNavbar} from "../../../nav/EmployeeNavbar.tsx";

export const ManagementSystem = ({setView}:{setView:(arg:string) => void}) => {
    return (
        <>
            <EmployeeNavbar setView={setView}/>
            Man
        </>
    );
};
