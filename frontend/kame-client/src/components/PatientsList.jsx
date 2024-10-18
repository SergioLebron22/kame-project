/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

export default function PatientsList() {
    const [searchQuery, setSearchQuery] = useState('')
    const [patientsList, setPatientsList] = useState([]);
    const [medicalRecord, setMedicalRecord] = useState(null);
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

    const handleAddButton = () => {
        navigate('/home/register-patient/')
    }

    const handleVitals = (patient_id, name) => {
        localStorage.setItem('patient_id', patient_id)
        localStorage.setItem('patient_name', name) 
        navigate(`/home/${patient_id}/create-vitals/`)
    }

    const handleHistory = (patient_id, name) => {
        localStorage.setItem('patient_id', patient_id);
        localStorage.setItem('patient_name', name);
        navigate(`/home/${patient_id}/create-history/`)
    }

    const handleCreateRecord = (patient_id, name) => {
        localStorage.setItem('patient_id', patient_id);
        localStorage.setItem('patient_name', name);
        navigate(`/home/${patient_id}/create-record`)
    }


    const filteredPatients = patientsList.filter(patient =>
        patient.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <>
            <div className="flex justify-between ml-20 mr-20">
                <SearchBar onSearch={handleQuery}/>
                <button onClick={handleAddButton} className="justify-end mr-1 p-3 rounded-full font-semibold text-white border-2 border-sky-500 bg-sky-400 hover:bg-sky-500 hover:text-white ">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                    </svg>
                </button>
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
                                <button onClick={() => handleVitals(patient.patient_id, patient.full_name)} className="mt-3 mr-5 px-3 py-2 border-b-2 rounded-md text-sm hover:bg-sky-400  hover:text-white">Vitals</button>
                                <button onClick={() => handleHistory(patient.patient_id, patient.full_name)} className="mt-3 mr-5 px-3 py-2 border-b-2 rounded-md text-sm hover:bg-sky-400  hover:text-white">History</button>
                                <button onClick={() => handleCreateRecord(patient.patient_id, patient.full_name)} className="mt-3 mr-5 px-3 py-2 border-b-2 rounded-md text-sm hover:bg-sky-400  hover:text-white">Create Record</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-5 text-gray-200">.</div>
        </>
    );
}
