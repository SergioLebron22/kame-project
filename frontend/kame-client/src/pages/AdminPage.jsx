import BarDisease from '../components/BarChart';
import LinePatients from '../components/LineChart';
import PiePatientAge from '../components/PieChart';
import NavBar from "../components/NavBar";
import { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const name = localStorage.getItem('name')

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionID');
        const role = localStorage.getItem('role');
        const checkAuth = async () => {
            await axios.get('http://127.0.0.1:8000/auth/check-auth/', {
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
        <div className="min-h-screen  bg-gradient-to-b from-slate-50 via-slate-50 to-sky-500">
            <NavBar />
            <div className="p-8">
                {/* Header Section */}
                <div className="bg-sky-500 text-white p-6 rounded-lg shadow-lg mb-6">
                    <h1 className="text-2xl font-bold">Welcome Back {name}!</h1>
                    <p className="text-lg">Have a nice day!</p>
                </div>

                {/* Main Dashboard Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Bar Chart */}
                    <div className="col-span-2 bg-white p-12 rounded-lg shadow-lg">
                        <div className='h-auto'><BarDisease /></div>
                    </div>

                    {/* Pie Chart and Line Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Population by Age</h2>
                        <PiePatientAge />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Patient Visits (Daily)</h2>
                        <LinePatients />
                    </div>
                </div>

                {/* Export and Actions Section */}
                <div className="flex justify-end space-x-4 mt-6">
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow">
                        Employees on Shift
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow">
                        Check Medical Records
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded shadow">
                        Export
                    </button>
                </div>
            </div>
        </div>
    );
}
