import {EmployeeNavbar} from "../../../nav/EmployeeNavbar.tsx";

export const HrSystem = ({setView}:{setView:(arg:string) => void}) => {
    return (
        <>
            <EmployeeNavbar setView={setView}/>
            HR
        </>
    );
};
