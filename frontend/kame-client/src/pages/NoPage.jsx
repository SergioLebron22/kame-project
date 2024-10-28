import logo from "../images/logo.png"

export default function NoPage() {

    const handleOnClick = () => {
        const role = localStorage.getItem('role');
        if (role === 'admin'){
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/home';
        }
    };

    return (
        <>
        <div className="bg-gradient-to-b p-40 from-gray-100 via-gray-100 to-sky-500 min-h-full justify-between">
          <div className="mx-96 bg-white shadow-2xl p-40 rounded-lg">
            <img src={logo} alt="logo" className="h-40 ml-auto mr-auto" onClick={handleOnClick}/>
            <p className="text-center text-2xl text-gray-600 mt-4">Oops! Looks like this page does not exist or is in development</p>
            <h1 className="text-6xl font-bold text-center mt-10">404</h1>  
          </div>
        </div>
        </>
    );
}
