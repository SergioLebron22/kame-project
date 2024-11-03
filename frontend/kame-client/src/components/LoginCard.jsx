import logo from "../images/logo.png"
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
// import { getCookie } from "../csrf";

export default function LoginCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        api.post('auth/login/',
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

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-100 to-sky-500 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center h-full w-96 bg-white shadow-2xl rounded-md p-10 py-20">
                <img
                        src={logo}
                        alt="logo"
                        className="mb-5 h-48 cursor-pointer"
                        onClick={handleLogoClick}
                    />
                    <h1 className="text-3xl font-bold mb-4 text-sky-500">LOG IN</h1>
                    <form onSubmit={handleLogin} className="w-auto max-w-sm p-6 pb-10 rounded-lg">
                    {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
                        <div className="input flex flex-col w-fit static my-5">
                        <label
                            htmlFor="input"
                            className="text-sky-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit"
                            >Email:</label
                        >
                        <input
                            id="password"
                            type="email"
                            placeholder="Write here..."
                            name="input"
                            className="border-sky-500 input px-[10px] py-[11px] text-xs bg-white border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        <div className="input flex flex-col w-fit static">
                        <label
                            htmlFor="input"
                            className="text-sky-500 text-xs font-semibold relative top-2 ml-[7px] px-[3px] bg-white w-fit"
                            >Password:</label
                        >
                        <input
                            id="password"
                            type="password"
                            placeholder="Write here..."
                            name="input"
                            className="border-sky-500 input px-[10px] py-[11px] text-xs bg-white border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <button className="text-white bg-sky-500 hover:bg-blue-500 px-2 py-1 w-full mt-10 rounded-md ">Log in</button>
                    </form>
                </div>
            </div>
        </>
    );
}
