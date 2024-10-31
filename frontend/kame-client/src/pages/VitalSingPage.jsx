import NavBar from "../components/NavBar";
import { useState, useEffect } from 'react';
import VitalSingForms from "../components/VitalSignsForms";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

export default function VitalSignsPage() {
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
                window.location.href = '/login';
            }
        })
        .catch(error => {
            console.error('There was an error checking authentication!', error);
            window.location.href = '/dashboard';
        });
    };
        checkAuth();
    }, []);

    if (!isAuthenticated) {
        console.log('User not auth')
        return <LoadingSpinner />
    }
    return (
        <>  
            <div className="bg-gradient-to-b from-gray-100 via-gray-100 to-sky-500 min-h-screen justify-between">
                <NavBar />
                <VitalSingForms />
            </div>
        </>
    )
}
