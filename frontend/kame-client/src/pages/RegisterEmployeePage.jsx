import RegisterEmployees from '../components/RegisterEmployees';
import NavBar from "../components/NavBar";

export default function EmployeeCreation() {
    return (
        <div className='bg-gray-200 min-h-screen justify-between'>
            <NavBar />
            <div className='h-full'>
                <RegisterEmployees />
            </div>
        </div>
    )
}
