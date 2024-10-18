import { useState } from "react";
import axios from "axios";
// import { useParams } from "react-router-dom";

export default function VitalSingForms(){
    const patientId = localStorage.getItem('patient_id')
    const [pulse, setPulse] = useState('');
    const [respiratoryRate, setRespiratoryRate] = useState('');
    const [temperature, setTemperature] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const patient = localStorage.getItem('patient_name')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newVitalSign = {
            patient_id: patientId,
            pulse: pulse,
            temperature: temperature,
            respiratory_rate: respiratoryRate,
            height: height,
            weight: weight,
        }

        try {
            const response = await axios.get(`http://127.0.0.1:8000/home/patients/${patientId}/vital_signs/`);

            if (response.data) {
                await axios.put(`http://127.0.0.1:8000/home/patients/${patientId}/vital_signs/`, newVitalSign);
                console.log("Vital sign updated successfully");
                window.location.href = '/home/'
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                try {
                    const response = await axios.post(`http://127.0.0.1:8000/home/patients/${patientId}/create_vital_signs/`, newVitalSign);
                    console.log(response.data);
                    console.log("Vital signs created successfully");
                    window.location.href = '/home/';
                } catch (error) {
                    console.error("There was an error creating vital signs", error);
                }
            } else {
                console.error("Error fetching vitals", error);
            }
        }
    };


    return (
        <>
            <div className="bg-white p-4 rounded shadow-md m-32">
                <h1 className="text-xl font-bold mb-4">{patient}'s Vital Signs</h1>
                <div className="mb-4 flex">
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="mt-5 flex">
                            <label className="block mb-1 mr-2" >Pulse:</label>
                            <input type="text" placeholder="Ex. 72 bmp" className="border-2 rounded p-1 w-full" value={pulse} onChange={(e) => setPulse(e.target.value)} />
                        </div>
                        <div className="mt-5 flex">
                            <label className="text-nowrap block mb-1 mr-2">Respiratory Rate:</label> 
                            <input type="text" placeholder="Ex. 16 breaths/min" className="border-2 rounded p-1 w-full"  value={respiratoryRate} onChange={(e) => setRespiratoryRate(e.target.value)} />
                        </div>
                        <div className="mt-5 flex">
                            <label className="block mb-1 mr-2">temperature </label>
                            <input type="text" placeholder="Ex.36.6°f" className="border-2 rounded p-1 w-full" value={temperature} onChange={(e)=> setTemperature(e.target.value)} />  
                        </div>
                        <div className="mt-5 flex">
                            <label className="block mb-1 mr-2">weight</label>
                            <input type="text"  placeholder="Ex.70lbs" className="border-2 rounded p-1 w-full" value={weight} onChange={(e) => setWeight(e.target.value)} />
                        </div>
                        <div className="mt-5 flex">
                            <label className="block mb-1 mr-2">height</label>
                            <input type="text" placeholder="Ex. 6.1ft" className="border-2 rounded p-1 w-full" value={height} onChange={(e) => setHeight(e.target.value)} />
                        </div>
                        <button className="p-1 px-2 bg-sky-400 mt-5 rounded-md hover:bg-sky-500 border-2 border-sky-500 text-white" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}