import BarDisease from '../components/BarChart';
import LinePatients from '../components/LineChart';
import PiePatientAge from '../components/PieChart';
import NavBar from "../components/NavBar";
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminPage() {
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
        <div>
            <NavBar />
            <div className="w-screen p-4 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col space-y-4">
                    <BarDisease />
                    <div className="flex w-full space-x-4">
                        <div className="w-1/2 h-96 p-4 border">
                            <PiePatientAge />
                        </div>
                        <div className="w-1/2 h-96 p-4 border">
                            <LinePatients />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
