import EmployeesList from "../components/EmployeesOnShift";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../api";

export default function EmployeeListPage () {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
            window.location.href = '/home';
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
            <EmployeesList />
        </div>
    )
}
