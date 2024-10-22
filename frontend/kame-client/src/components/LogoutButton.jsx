import axios from "axios";

export default function LogoutButton() {

    const handleLogout = async () => {
        const sessionID = localStorage.getItem('sessionID');
        await axios.post('http://127.0.0.1:8000/auth/logout/', {}, {
            headers: {
                'Authorization': sessionID,
            }
        })
        .then((res) => {
            if (res.data.message === 'log out successful!'){
                localStorage.removeItem('sessionID')
                localStorage.removeItem('name')
                delete axios.defaults.headers.common['Authorization'];
                window.location.href = '/login/';
            }
        })
        .catch(err => {
            console.log("There was an error logging out!", err);
            localStorage.removeItem('sessionID');
            localStorage.removeItem('name')
            delete axios.defaults.headers.common['Authorization'];
            window.location.href = '/login/';
        })
    }

    return (
        <button 
            onClick={handleLogout}
            className="flex items-center justify-center font-bold text-black bg-white w-full px-9 py-2 hover:bg-red-400 hover:text-white focus:ring-red-700 focus:ring-2">
            <svg 
                className="w-6 h-6 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg">
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
            </svg>
            Log out
        </button>
    );
};