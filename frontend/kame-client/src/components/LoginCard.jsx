import logo from "../images/logo.png"
import { useState } from "react";
import axios from 'axios';
// import { getCookie } from "../csrf";

export default function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/auth/login/',
            {username: email, password},
            {
                withCredentials: true,
            })
            .then(response => {
                console.log(response.data);
                if (response.data.role === 'admin') {
                    console.log(response.data.role)
                    localStorage.setItem('role', response.data.role)
                    localStorage.setItem('sessionID', response.data.sessionID)
                    let session = localStorage.getItem('sessionID')
                    console.log(session)
                    localStorage.setItem('name', response.data.name)
                    window.location.href = '/dashboard';
                } else {
                    console.log(response.data)
                    localStorage.setItem('sessionID', response.data.sessionID)
                    localStorage.setItem('name', response.data.name)
                    localStorage.setItem('role', response.data.role)

                    window.location.href = '/home'
                }
            })
            .catch(err => {
                console.error('There was an error logging in!', err);
                if (err.response && err.response.data && err.response.data.message) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage('An unexpected error occurred. Please try again.');
                }
            });
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-sky-500 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center h-full w-96 bg-gray-100 shadow-2xl rounded-md p-10 py-20">
                    <img src={logo} alt="logo" className="mb-5 h-48" />
                    <h1 className="text-3xl font-bold mb-4 text-sky-500">LOGIN</h1>
                    <form onSubmit={handleLogin} className="w-auto max-w-sm p-6 pb-10 rounded-lg">
                    {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
                        <div className="mb-4">
                            <label htmlFor="email" className="text-sm p-1 text-gray">Email:</label>
                            <input type="email" placeholder="Enter Email" className="rounded-md pl-2 p-1 w-full" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm p-1">Password:</label>
                            <input type="password" placeholder="Enter password " className="rounded-md pl-2 p-1 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="text-white bg-sky-500 hover:bg-blue-500 px-2 py-1 w-full mt-10 rounded-md ">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
}
