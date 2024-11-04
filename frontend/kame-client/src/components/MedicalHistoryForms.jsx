/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import api from "../api";

export default function MedicalHistoryForms(){
    const patientId = localStorage.getItem('patient_id');
    const [surgeries, setSurgeries] = useState('');
    const [allergies, setAllergies] = useState('');
    const [medicalConditions, setMedicalCondition] = useState('');
    const patient = localStorage.getItem('patient_name')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const NewMedicalHistory = {
            patient_id: patientId,
            surgeries: surgeries,
            allergies: allergies,
            medical_conditions: medicalConditions,
        }

        try {
            const response = await api.get(`home/patients/${patientId}/medical_history/`);

            if (response.data) {
                await api.put(`home/patients/${patientId}/medical_history/`, NewMedicalHistory);
                console.log("Medical History updated successfully");
                window.location.href = '/home/'
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                try {
                    const response = await api.post(`home/patients/${patientId}/create_medical_history/`, NewMedicalHistory);
                    console.log(response.data);
                    console.log("Medical History created successfully");
                    window.location.href = '/home/';
                } catch (error) {
                    console.error("There was an error creating medical history", error);
                }
            } else {
                console.error("Error fetching history", error);
            }
        }
    };


    return (
        <>
            <div className="bg-white p-10 rounded-xl  shadow-2xl m-32">
                <h1 className="text-xl font-bold mb-4">{patient}'s Medical History</h1>
                <div className="mb-4 flex">
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="mt-5 flex">
                            <label className="block mb-1 mr-2 font-bold">Surgeries:</label>
                            <input required type="text" placeholder="Ex. Appendectomy" className="border-2 rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={surgeries} onChange={(e) => setSurgeries(e.target.value)} />
                        </div>
                        <div className="mt-5 flex">
                            <label className="text-nowrap block mb-1 mr-2 font-bold">Allergies:</label>
                            <input required type="text" placeholder="Ex. Penicillin" className="border-2 rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"  value={allergies} onChange={(e) => setAllergies(e.target.value)} />
                        </div>
                        <div className="mt-5 flex">
                            <label className="block mb-1 mr-2 font-bold">Medical Conditions:</label>
                            <input required type="text" placeholder="Ex. Hypertension" className="border-2 rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={medicalConditions} onChange={(e)=> setMedicalCondition(e.target.value)} />
                        </div>
                        <button className="p-1 px-2 bg-sky-400 mt-5 rounded-md hover:bg-sky-500 border-2 border-sky-500 text-white" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
