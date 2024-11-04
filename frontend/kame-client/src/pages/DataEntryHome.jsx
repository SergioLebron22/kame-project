import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import PatientsList from "../components/PatientsList";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../api";
// import { getCookie } from "../csrf";

export default function DataEntryHome() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const role = localStorage.getItem('role')

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
                if (role === 'admin') {
                    window.location.href = "/dashboard"
                }
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
    }, [role, navigate]);

    if (!isAuthenticated) {
        console.log('User not auth')
        return <LoadingSpinner />
    }

    return (
        <>
            <div className="bg-gradient-to-b  from-gray-100 via-gray-100 to-sky-500 min-h-full justify-between">
                <NavBar role={role} />
                <h1 className="flex align-center justify-start font-bold my-10 ml-24 text-gray-800 text-4xl">Patients List</h1>
                <PatientsList />
            </div>
        </>
    );
}
