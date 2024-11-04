import { useState, useEffect } from 'react';
import api from "../api";
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

export default function MedicalRecordInfo() {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const [medicalRecord, setMedicalRecord] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        api.get(`home/patients/${patientId}/medical_record/`)
            .then(response => {
                if (response.data) {
                    console.log(response.data);
                    setMedicalRecord(response.data);
                } else {
                    navigate('/home/');
                }
            })
            .catch(err => {
                console.error("There was an error fetching the patient's medical record!", err);
                setErrorMessage('There was an error fetching the patient\'s medical record.');
                navigate('/home/');
            });
    }, [patientId, navigate]);

    if (!medicalRecord) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {errorMessage && <div className="error">{errorMessage}</div>}
            <h1 className="flex align-center justify-start font-bold my-10 ml-80 text-gray-800 text-4xl">Medical Record</h1>
            <div className='m-10 md:mx-80 bg-white p-14 rounded-lg shadow-2xl'>
                <p className='font-semibold text-2xl mb-3'>{medicalRecord.patient_id?.full_name || 'Patient record does not exist'}</p>
                <p><strong>Date of birth: </strong>{medicalRecord.patient_id?.date_of_birth || ''}</p>
                <p><strong>Address: </strong>{medicalRecord.patient_id?.address || ''}, {medicalRecord.patient_id?.city || ''}, {medicalRecord.patient_id?.country || ''}</p>
                <p><strong>Gender:</strong> {medicalRecord.patient_id?.gender}</p>
                <p><strong>Phone Number:</strong> {medicalRecord.patient_id?.phone_number}</p>
                <p><strong>Record Number:</strong> {medicalRecord.record_id}</p>
            </div>
            <div className='flex grid-cols-2 gap-6 align-center justify-center min-w-screen mx-10 md:mx-80 h-96'>
                <div className='p-10 bg-white w-full rounded-xl shadow-2xl'>
                    <h1 className='text-lg font-semibold'>Medical History</h1>
                    <p className='mt-5 ml-3'><strong>Surgeries:</strong> {medicalRecord.history_id?.surgeries}</p>
                    <p className='mt-5 ml-3'><strong>Allergies:</strong> {medicalRecord.history_id?.allergies}</p>
                    <p className='mt-5 ml-3'><strong>Medical Conditions:</strong> {medicalRecord.history_id?.medical_conditions}</p>
                </div>
                <div className='p-10 bg-white w-full rounded-xl shadow-2xl'>
                    <h1 className='text-lg font-semibold'>Vitals</h1>
                    <p className='mt-5 ml-3'><strong>Pulse: </strong>{medicalRecord.vitals_id?.pulse} BPM</p>
                    <p className='mt-5 ml-3'><strong>Respiratory Rate: </strong>{medicalRecord.vitals_id?.respiratory_rate} bpm</p>
                    <p className='mt-5 ml-3'><strong>Body Temperature: </strong>{medicalRecord.vitals_id?.temperature} °F</p>
                    <p className='mt-5 ml-3'><strong>Weight: </strong>{medicalRecord.vitals_id?.weight}lbs</p>
                    <p className='mt-5 ml-3'><strong>Height: </strong>{medicalRecord.vitals_id?.height} ft</p>
                </div>
            </div>
            <div className='m-10 mb-10 md:mx-80 bg-white p-14 rounded-lg shadow-2xl'>
                <h1 className='text-lg font-semibold'>Reports</h1>
                <p className='mt-5 ml-3'><strong>Imaging: </strong>{medicalRecord.imaging_reports}</p>
                <p className='mt-5 ml-3'><strong>Lab Results: </strong>{medicalRecord.lab_data}</p>
                <p className='mt-5 ml-3'><strong>Inmunizations: </strong>{medicalRecord.inmunizations}</p>
                <p className='mt-5 ml-3'><strong>Diagnosis: </strong>{medicalRecord.code?.description} ({medicalRecord.code?.code})</p>
            </div>
            <div className='m-10 mb-10 md:mx-80 bg-white p-14 rounded-lg shadow-2xl'>
                <h1 className='text-lg font-semibold'>Progress Notes</h1>
                <p className='mt-5 ml-3'>{medicalRecord.progress_notes}</p>
            </div>
            <div className='text-gray-200'>.</div>
        </>
    );
}
