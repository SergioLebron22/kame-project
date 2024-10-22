import RegisterEmployees from '../components/RegisterEmployees';
import NavBar from "../components/NavBar";
import BackButton from '../components/BackButton';

export default function EmployeeCreation() {
    return (
        <div>
        <div className='bg-gray-200 min-h-screen justify-between'>
            <NavBar />
            <BackButton />
            <div className='h-full'>
                <RegisterEmployees />
            </div>
        </div>
        </div>
    )
}
