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
      <div className="bg-gradient-to-b p-10 sm:p-20 md:p-40 from-gray-100 via-gray-100 to-sky-500 min-h-screen flex items-center justify-center">
        <div className="mx-4 sm:mx-20 md:mx-40 lg:mx-60 xl:mx-96 bg-white shadow-2xl p-10 sm:p-20 md:p-40 rounded-lg">
        <img src={logo} alt="logo" className="h-20 sm:h-30 md:h-40 mx-auto" onClick={handleOnClick}/>
        <p className="text-center text-lg sm:text-xl md:text-2xl text-gray-600 mt-4">Oops! Looks like this page does not exist or is in development</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mt-10">404</h1>  
        </div>
      </div>
      </>
    );
}
