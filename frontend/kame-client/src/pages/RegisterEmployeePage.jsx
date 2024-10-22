import RegisterEmployees from '../components/RegisterEmployees';
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from '../components/LoadingSpinner';
import BackButton from '../components/BackButton';

export default function EmployeeCreation() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionID');
        const checkAuth = async () => {
            await axios.get('http://127.0.0.1:8000/auth/check-auth/', {
                headers: {
                    'Authorization': sessionId,
                },
                timeout: 5000,
            })
        .then(res => {
            console.log('Authentication response:', res.data);
            if (res.data.isAuthenticated) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                window.location.href = '/login/';
            }
        })
        .catch(error => {
            console.error('There was an error checking authentication!', error);
            window.location.href = '/login/';
        });
    };
        checkAuth();
    }, []);

    if (!isAuthenticated) {
        console.log('User not auth')
        return <LoadingSpinner />
    }

    return (
        <div className='bg-gradient-to-b from-gray-100 via-gray-100 to-sky-500 min-h-screen justify-between'>
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
