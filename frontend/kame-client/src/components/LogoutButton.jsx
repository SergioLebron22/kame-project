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
                window.location.href = '/auth/login/';
            }
        })
        .catch(err => {
            console.log("There was an error logging out!", err);
            localStorage.removeItem('sessionID');
            localStorage.removeItem('name')
            delete axios.defaults.headers.common['Authorization'];
            window.location.href = '/auth/login/';
        })
    }

    return (
        <button 
        onClick={handleLogout}
        className="block text-center text-white bg-red-400 border-2 border-red-600 px-9 py-2 rounded-md hover:bg-red-600 focus:ring-red-700 focus:ring-2">
            Logout
        </button>
    );
};