import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import MedicalRecordInfo from "../components/MedicalRecordInfo";

export default function MedicalRecordPage() {
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
        <div className="bg-gray-200 min-h-full">
            <NavBar />
            <MedicalRecordInfo />
        </div>
    );
}