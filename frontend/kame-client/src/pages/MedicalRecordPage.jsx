import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import MedicalRecordInfo from "../components/MedicalRecordInfo";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function MedicalRecordPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionID');
        const checkAuth = async () => {
            await api.get('auth/check-auth/', {
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
        <div className="bg-gradient-to-b from-slate-50 via-slate-50 to-sky-500 min-h-full">
            <NavBar />
            <MedicalRecordInfo />
        </div>
    );
}
