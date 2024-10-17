import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PatientsList from "../components/PatientsList";
import axios from "axios";
// import { getCookie } from "../csrf";

export default function DataEntryHome() {
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
                if (role === 'admin')
            } else {
                setIsAuthenticated(false);
                window.location.href = '/auth/login/';
            }
        })
        .catch(error => {
            console.error('There was an error checking authentication!', error);
            window.location.href = '/auth/login/';
        });
    };
        checkAuth();
    }, []);

    if (!isAuthenticated) {
        console.log('User not auth')
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="bg-gray-200 min-h-full">
                <NavBar />
                <h1 className="flex align-center justify-start font-bold my-10 ml-20 text-gray-800 text-4xl">Patients List</h1>
                <PatientsList />
            </div>
        </>
    );
}
