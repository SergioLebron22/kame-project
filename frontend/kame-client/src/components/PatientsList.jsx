import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
// import PatientElement from "./PatientElement";

export default function PatientsList() {
    const [searchQuery, setSearchQuery] = useState('')
    const [patientsList, setPatientsList] = useState([]);
    const navigate = useNavigate();

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

    const handlePatientClick = (patient_id) => {
        localStorage.setItem('patient_id', patient_id)
        navigate(`/home/${patient_id}`)
    }

    const filteredPatients = patientsList.filter(patient =>
        patient.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <>
            <div className="flex justify-start ml-20">
                <SearchBar onSearch={handleQuery}/>
            </div>
            <div className="mx-20 mt-3 p-5 bg-white min-h-screen rounded-lg border-2 border-gray-300 shadow-xl">
                <ul role="list" className="divide-y divide-gray-400">
                    {filteredPatients.map((patient) => (
                        <li key={patient.patient_id} className="flex justify-between gap-x-6 py-5 border-b-2" >
                            <div className="min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto p-3">
                                    <p onClick={() => handlePatientClick(patient.patient_id)} className="text-sm font-semibold leading-6 text-gray-900">{patient.full_name}</p>
                                    <p className="leading-5 text-xs text-gray-600">Date of Birth: {patient.date_of_birth}</p>
                                </div>
                            </div>
                            <div>
                                <button className="mt-3 mr-5 px-3 py-2 border-b-2 rounded-md text-sm hover:bg-sky-400  hover:text-white">Vitals</button>
                                <button className="mt-3 mr-5 px-3 py-2 border-b-2 rounded-md text-sm hover:bg-sky-400  hover:text-white">History</button>
                                <button className="mt-3 mr-5 px-3 py-2 border-b-2 rounded-md text-sm hover:bg-sky-400  hover:text-white">Details</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
