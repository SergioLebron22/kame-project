import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
// import PatientElement from "./PatientElement";

export default function PatientsList() {
    const [searchQuery, setSearchQuery] = useState('')
    const [patientsList, setPatientsList] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/home/patients/')
            .then(response => {
                console.log(response.data);
                setPatientsList(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the patients!", error);
            });
    }, []);

    const handleQuery = (query) => {
        setSearchQuery(query);
    }

    const filteredPatients = patientsList.filter(patient =>
        patient.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <>
            <div className="flex align-center justify-center">
                <SearchBar onSearch={handleQuery}/>
            </div>
           
            <div className="mx-20 mt-10 p-5 bg-white min-h-screen rounded-lg border-2 border-gray-300 shadow-xl">
                <ul role="list" className="divide-y divide-gray-400">
                    {filteredPatients.map((patient) => (
                        <li key={patient.patient_id} className="flex justify-between gap-x-6 py-5 border-b-2">
                            <div className="min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto p-3">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{patient.full_name}</p>
                                    <p className="leading-5 text-xs text-gray-600">Date of Birth: {patient.date_of_birth}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
