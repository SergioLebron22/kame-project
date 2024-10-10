import logo from "../images/logo.png"

export default function LoginCard() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-sky-500 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center h-auto md:h-128 w-96 bg-gray-100 rounded-md p-5">
                    <img src={logo} alt="logo" className="mb-5 h-48" />
                    <h1 className="text-3xl font-bold mb-4 text-sky-500">LOGIN</h1>
                    <form action="#" className="w-auto max-w-sm p-6 pb-10 rounded-lg">
                        <div className="mb-4">
                            <label htmlFor="email" className="text-sm p-1 text-gray">Email:</label>
                            <input type="email" placeholder="Enter Email" className="rounded-md pl-2 p-1 w-full"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm p-1">Password:</label>
                            <input type="password" placeholder="Enter password " className="rounded-md pl-2 p-1 w-full" />
                        </div>
                        <button className="text-white bg-sky-500 hover:bg-blue-500 px-2 py-1 w-full mt-10 rounded-md ">Login</button>
                    </form>
                </div>
            </div>
        </>
    );
} 