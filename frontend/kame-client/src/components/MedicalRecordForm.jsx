export default function MedicalRecordForm() {
    return (
        <>
            <div className="h-full">
                <h1 className="flex align-center justify-start font-bold my-10 ml-80 text-gray-800 text-4xl">Create Medical Record</h1>
                <form>
                    <div className="bg-white border-2 shadow-2xl border-gray-300 m-10 mx-80 p-16 h-screen rounded-lg">
                        <label className="font-semibold text-2xl">Progress Notes</label>
                        <textarea className="mt-2 w-full h-56 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
                    </div>
                </form>
            </div>
            <div className="text-sky-500">.</div>
        </>
    );
}