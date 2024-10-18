export default function MedicalRecordForm() {
    return (
        <>
            <div className="h-full">
                <h1 className="flex align-center justify-start font-bold my-10 ml-80 text-gray-800 text-4xl">Create Medical Record</h1>
                <form>
                    <div className="bg-white m-10 mx-80 p-16 h-screen rounded-lg">
                        <label className="font-semibold text-2xl">Progress Notes</label>
                        <input 
                            type="text" 
                            className="border-2 border-gray-300 rounded-lg mt-5 h-96 w-full p-4 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your progress notes here"
                        />
                    </div>
                </form>
            </div>
        </>
    );
}