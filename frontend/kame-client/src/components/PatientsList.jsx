/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import {Plus} from "lucide-react"

export default function PatientsList() {
    const [searchQuery, setSearchQuery] = useState('');
    const [patientsList, setPatientsList] = useState([]);
    const [medicalRecordStatus, setMedicalRecordStatus] = useState({});
    const [vitalsStatus, setVitalsStatus] = useState({});
    const [historyStatus, setHistoryStatus] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients();
    }, [searchQuery, currentPage]);

    const fetchPatients = () => {
        axios.get('http://127.0.0.1:8000/home/patients/', {
            params: {
                query: searchQuery,
                page: currentPage,
                page_size: 10,
            },
        })
            .then(response => {
                console.log(response.data);
                setPatientsList(response.data.patients);
                setTotalPages(response.data.total_pages)
                fetchMedicalRecords(response.data.patients);
                fetchVitalsStatus(response.data.patients);
                fetchHistoryStatus(response.data.patients)
            })
            .catch(error => {
                console.error("There was an error fetching the patients!", error);
            });
    };

    const fetchMedicalRecords = (patients) => {
        const status = {};
        patients.forEach(patient => {
            axios.get(`http://127.0.0.1:8000/home/patients/${patient.patient_id}/medical_record/`)
                .then(response => {
                    status[patient.patient_id] = true;
                })
                .catch(error => {
                    status[patient.patient_id] = false;
                })
                .finally(() => {
                    setMedicalRecordStatus(prevStatus => ({ ...prevStatus, ...status }));
                });
        });
    };

    const fetchVitalsStatus = (patients) => {
        const status = {};
        patients.forEach(patient => {
            axios.get(`http://127.0.0.1:8000/home/patients/${patient.patient_id}/vital_signs/`)
                .then(response => {
                    status[patient.patient_id] = true;
                })
                .catch(error => {
                    status[patient.patient_id] = false;
                })
                .finally(() => {
                    setVitalsStatus(prevStatus => ({ ...prevStatus, ...status }));
                });
        });
    };

    const fetchHistoryStatus = (patients) => {
        const status = {};
        patients.forEach(patient => {
            axios.get(`http://127.0.0.1:8000/home/patients/${patient.patient_id}/medical_history/`)
                .then(response => {
                    status[patient.patient_id] = true;
                })
                .catch(error => {
                    status[patient.patient_id] = false;
                })
                .finally(() => {
                    setHistoryStatus(prevStatus => ({ ...prevStatus, ...status}));
                })
        })
    }

    const handleQuery = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    const filteredPatients = patientsList.filter(patient =>
        patient.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <>
            <div className="flex justify-between ml-20 mr-20">
                <SearchBar onSearch={handleQuery}/>
                <div className='flex'>
                    <div className='flex rounded-lg pt-3 mr-24 border-gray-300 align-center justify-center text-center'>
                        <p className='mx-5 font-bold text-green-400'>Done</p>
                        <p className='text-gray-300'>|</p>
                        <p className='mx-5 font-bold text-sky-400'>Not Done</p>
                    </div>
                    <button onClick={handleAddButton} className="justify-end mr-1 p-2 rounded-full  text-white border-2 border-sky-500 bg-sky-400 hover:bg-sky-500 hover:text-white ">
                        <Plus />
                    </button>
                </div>
            </div>
            <div className="mx-20 mt-3 p-5 bg-white min-h-screen rounded-lg border-2 border-gray-300 shadow-xl">
                <ul role="list" className="divide-y divide-gray-400">
                {filteredPatients.map((patient) => (
                        <li key={patient.patient_id} className="flex justify-between gap-x-6 py-5 border-b-2">
                            <div className="min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto p-3">
                                    <p onClick={() => handlePatientClick(patient.patient_id)} className="text-lg font-semibold leading-6 text-gray-900">{patient.full_name}</p>
                                    <p className="leading-5 text-xs text-gray-600"><strong>Date of Birth:</strong> {patient.date_of_birth}</p>
                                    <p className="leading-5 text-xs text-gray-600">
                                        <strong>Medical Record:</strong> {medicalRecordStatus[patient.patient_id] ? 'Created' : 'No Record'}
                                    </p>
                                </div>
                            </div>
                            <div>  
                            </div>
                            <div className="flex">
                                <button
                                    onClick={() => handleVitals(patient.patient_id, patient.full_name)}
                                    className={`mt-8 mr-5 px-3 py-1 h-10 border-b-2 rounded-md text-sm hover:text-white ${vitalsStatus[patient.patient_id] ? 'hover:bg-green-400' : 'hover:bg-sky-400'}`}
                                >
                                    Vitals
                                </button>
                                <button 
                                    onClick={() => handleHistory(patient.patient_id, patient.full_name)} 
                                    className={`mt-8 mr-5 px-3 py-1 h-10 border-b-2 rounded-md text-sm hover:text-white ${historyStatus[patient.patient_id] ? 'hover:bg-green-400' : 'hover:bg-sky-400'}`}
                                >
                                    History        
                                    </button>
                                <button 
                                    onClick={() => handleCreateRecord(patient.patient_id, patient.full_name)} 
                                    className={`mt-8 mr-5 px-3 py-1 h-10 border-b-2 rounded-md text-sm hover:bg-sky-400  hover:text-white ${medicalRecordStatus[patient.patient_id] ? 'hover:bg-green-400' : 'hover:bg-sky-400'}`}
                                >
                                    Create Record
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-white bg-sky-400 rounded-md hover:bg-sky-600 flex items-center"
                    >
                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-white bg-sky-400 rounded-md hover:bg-sky-600 flex items-center"
                    >
                        Next
                        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mt-5 text-gray-200">.</div>
        </>
    );
}