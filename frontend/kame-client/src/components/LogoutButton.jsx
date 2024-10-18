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
            className="block text-center font-bold text-black  bg-white w-full px-9 py-2 hover:bg-red-400 hover:text-white focus:ring-red-700 focus:ring-2">
                Log out
        </button>
    );
};