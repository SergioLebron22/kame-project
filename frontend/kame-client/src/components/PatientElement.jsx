/* eslint-disable react/prop-types */


export default function PatientElement({ patientsList }) {
    return (
        <div className="mx-20 mt-10 p-5 bg-white h-full rounded-lg border-2 border-gray-300 shadow-xl">
            <ul role="list" className="divide-y divide-gray-400">
                {patientsList.map((patient) => (
                    <li key={patient.patient_id} className="flex justify-between gap-x-6 py-5 border-b-2">
                        <div className="min-w-0 gap-x-4">
                            <div className="min-w-0 flex p-3">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{patient.full_name}</p>
                                <p className="px-5">{patient.age}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
