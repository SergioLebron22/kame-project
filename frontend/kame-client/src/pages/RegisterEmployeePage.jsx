import RegisterEmployees from '../components/RegisterEmployees';
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function EmployeeCreation() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionID');
        const role = localStorage.getItem('role');
        const checkAuth = async () => {
            await api.get('auth/check-auth/', {
                headers: {
                    'Authorization': sessionId,
                },
                timeout: 5000,
            })
        .then(res => {
            console.log('Authentication response:', res.data);
            if (res.data.isAuthenticated && role === 'admin') {
                setIsAuthenticated(true);
            } else if (res.data.isAuthenticated && role !== 'admin'){
                window.location.href = '/home'
            } else {
                setIsAuthenticated(false);
                window.location.href = '/login/';
            }
        })
        .catch(error => {
            console.error('There was an error checking authentication!', error);
            navigate(-1);
        });
    };
        checkAuth();
    }, [navigate]);

    if (!isAuthenticated) {
        console.log('User not auth')
        return <LoadingSpinner />
    }

    return (
        <div className='bg-gradient-to-b from-gray-100 via-gray-100 to-sky-500 min-h-screen justify-between'>
            <NavBar />
            <div className='h-full'>
                <RegisterEmployees />
            </div>
        </div>
    )
}
