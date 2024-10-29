/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDebounce from '../utils/useDebounce';

export default function MedicalRecordForm() {
    const patientId = localStorage.getItem('patient_id');
    const [code, setCode] = useState(null);
    const [progressNotes, setProgressNotes] = useState('');
    const [labData, setLabData] = useState('');
    const [imagingReports, setImagingReports] = useState('');
    const [medications, setMedications] = useState('');
    const [inmunizations, setInmunizations] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [codeList, setCodeList] = useState([]);
    const [selectedCode, setSelectedCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const newMedicalRecord = {
        patient_id: patientId,
        code: code, // This can be null
        progress_notes: progressNotes,
        lab_data: labData,
        imaging_reports: imagingReports,
        inmunizations: inmunizations,
        medications: medications,
    };

    useEffect(() => {
        if (debouncedSearchQuery) {
            setLoading(true);
            axios.get('http://127.0.0.1:8000/home/get_codes/', {
                params: {
                    query: debouncedSearchQuery,
                    page: page,
                    page_size: 10,
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        console.log(res.data);
                        setCodeList(res.data.codes);
                        setTotalPages(res.data.total_pages);
                    } else {
                        console.error('Unexpected response status:', res.status);
                    }
                })
                .catch(err => {
                    console.error('There was an error fetching codes:', err);
                    if (err.response) {
                        console.error('Response data:', err.response.data);
                        console.error('Response status:', err.response.status);
                        console.error('Response headers:', err.response.headers);
                    } else if (err.request) {
                        console.error('Request data:', err.request);
                    } else {
                        console.error('Error message:', err.message);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [debouncedSearchQuery, page]);

    const handleQuery = (query) => {
        setSearchQuery(query);
        setPage(1); // Reset to first page on new search
    };

    const handleSuggestionClick = (code) => {
        if (code) {
            setSelectedCode(code);
            setSearchQuery(code.description);
            setCode(code.code);
        } else {
            setSelectedCode(null);
            setSearchQuery('');
            setCode(null);
        }
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://127.0.0.1:8000/home/patients/${patientId}/medical_record/`);

            if (response.data) {
                try {
                    await axios.put(`http://127.0.0.1:8000/home/patients/${patientId}/medical_record/`, newMedicalRecord, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    console.log('Medical Record updated successfully!');
                    window.location.href = '/home/';
                } catch (error) {
                    console.error('There was an error updating the medical record', error);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                try {
                    const createResponse = await axios.post(`http://127.0.0.1:8000/home/patients/${patientId}/create_medical_record/`, newMedicalRecord, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    console.log(createResponse.data);
                    console.log('Medical record created successfully!');
                    window.location.href = '/home/';
                } catch (error) {
                    console.error('There was an error creating the medical record', error);
                    if (error.response) {
                        console.error('Response data:', error.response.data);
                        console.error('Response status:', error.response.status);
                        console.error('Response headers:', error.response.headers);
                    } else if (error.request) {
                        console.error('Request data:', error.request);
                    } else {
                        console.error('Error message:', error.message);
                    }
                }
            } else {
                console.error('Error fetching medical record', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Request data:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
            }
        }
    };

    const filteredCodes = codeList.filter(code =>
        code.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="h-full">
                <h1 className="flex align-center justify-start font-bold my-10 ml-20 md:ml-80 text-gray-800 text-4xl">Create Medical Record</h1>
                <form onSubmit={handleOnSubmit}>
                    <div className="bg-white shadow-2xl m-10 mx-20 md:mx-80 p-16 h-full rounded-lg">
                        <label className="font-semibold text-2xl">Progress Notes</label>
                        <textarea
                            className="mt-2 w-full h-56 p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            value={progressNotes}
                            onChange={(e) => setProgressNotes(e.target.value)}
                            required
                        ></textarea>
                        <div className="pt-10 mr-5 relative">
                            <label className="font-semibold text-xl">Diagnosis</label>
                            <input
                                type="search"
                                className="block ml-4 p-2.5 w-full z-20 text-sm text-gray-800 bg-white rounded-l-lg rounded-e-lg border-s-gray-50 border-s-2 border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-white dark:border-s-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:border-blue-500"
                                placeholder="Search for a code..."
                                value={searchQuery}
                                onChange={(e) => handleQuery(e.target.value)}
                            />
                            {loading && <div>Loading...</div>}
                            {searchQuery && filteredCodes.length > 0 && (
                                <ul className="absolute z-10 w-full ml-4 bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                                    {filteredCodes.map((code, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                handleSuggestionClick(code);
                                                setCodeList([]);
                                            }}
                                        >
                                            {code.description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="pt-10 mr-5">
                            <label className="font-semibold text-xl">Lab Data</label>
                            <input
                                className="border-2 border-gray-300 p-1 mx-4 mt-5 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                value={labData}
                                onChange={(e) => setLabData(e.target.value)}
                            />
                        </div>
                        <div className="pt-10 mr-5">
                            <label className="font-semibold text-xl">Imaging Reports</label>
                            <input
                                className="border-2 border-gray-300 p-1 mx-4 mt-5 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                value={imagingReports}
                                onChange={(e) => setImagingReports(e.target.value)}
                            />
                        </div>
                        <div className="pt-10 mr-5">
                            <label className="font-semibold text-xl">Medications</label>
                            <input
                                className="border-2 border-gray-300 p-1 mx-4 mt-5 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                value={medications}
                                onChange={(e) => setMedications(e.target.value)}
                            />
                        </div>
                        <div className="pt-10 mr-5">
                            <label className="font-semibold text-xl">Inmunizations</label>
                            <input
                                className="border-2 border-gray-300 p-1 mx-4 mt-5 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                value={inmunizations}
                                onChange={(e) => setInmunizations(e.target.value)}
                            />
                        </div>

                        <button className="p-1 px-2 bg-sky-400 mt-16 rounded-md hover:bg-sky-500 border-2 border-sky-500 text-white" type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div className="text-sky-500">.</div>
        </>
    );
}
