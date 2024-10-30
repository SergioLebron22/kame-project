/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function RegisterCard() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [fullName, setFullName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [ssn, setSsn] = useState("")
    
    const newPatient = {
        full_name: fullName,
        age: age,
        gender: gender,
        phone_number: phoneNumber,
        address: address,
        city: city,
        country: country,
        date_of_birth: dateOfBirth,
        ssn: ssn
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();

        await axios.post('http://127.0.0.1:8000/home/patients/create_patient/', newPatient)
            .then(res => {
                console.log(res.data);
                console.log("Patient created successfully!")
                navigate('/home/')
            })
            .catch(err => [
                console.error("There was an error creating patient", err)
            ])
    }


    return (
        <div className="m-20 p-10 rounded-lg shadow-2xl border-2 bg-white h-auto">
            <h1 className="font-bold pl-5 text-2xl mb-3">Register Patient</h1>
            <form onSubmit={handleOnSubmit}>
            {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
                <div>
                    <label htmlFor="text" className="ml-10 font-semibold">Full Name: </label>
                    <input required type="text" placeholder="Ex. Nombre Apellidos" className="border-2 border-gray-400 p-1 mx-2 mt-5 w-96 rounded-md" value={fullName} onChange={(e) => setFullName(e.target.value)}/>

                    <label htmlFor="text" className="ml-5 font-semibold">Gender: </label>
                    <input required type="text" placeholder="Ex. Male" className="border-2 border-gray-400 p-1 mx-2 mt-5 w-20 rounded-md" value={gender} onChange={(e) => setGender(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="date" className="ml-10 font-semibold">Date of Birth: </label>
                    <input required type="date" className="border-2 border-gray-400 p-1 mx-2 mt-5 w-96 rounded-md" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

                    <label htmlFor="number" className="ml-5 font-semibold">Age: </label>
                    <input required type="number" placeholder="Ex. 99" min="0" max="120" className="border-2 border-gray-400 p-1 mx-2 mt-5 w-20 rounded-md" value={age} onChange={(e) => setAge(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="text" className="ml-10 font-semibold">Address: </label>
                    <input required type="text" placeholder="Ex. 123 main street" className="border-2 border-gray-400 p-1 mx-2 mt-5 w-96 rounded-md" value={address} onChange={(e) => setAddress(e.target.value)}/>

                    <label htmlFor="text" className="ml-5 font-semibold">City: </label>
                    <input required type="text" placeholder="Ex. San Juan" className="border-2 border-gray-400 p-1 mx-2 mt-5 w-40 rounded-md" value={city} onChange={(e) => setCity(e.target.value)} />

                    <label htmlFor="text" className="ml-5 font-semibold">Country:</label>
                    <input required type="text" placeholder="Ex. Puerto Rico" className="border-2 border-gray-400 p-1 mx-2 mt-5 w-40 rounded-md" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="tel" className="ml-10 font-semibold">Phone Number: </label>
                    <input required type="tel" placeholder="(123) 456-7890 " pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="border-2 border-gray-400 p-1 mx-2 mt-5 w-96 rounded-md" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="text" className="ml-10 font-semibold">SSN: </label>
                    <input required type="text" placeholder="123-45-7890 " pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}" className="border-2 border-gray-400 p-1 mx-2 mt-5 w-96 rounded-md" value={ssn} onChange={(e) => setSsn(e.target.value)}/>
                </div>
                <div className="flex justify-end">
                    <button className="bg-sky-400 mt-10 font-semibold shadow-lg py-2 px-4 rounded-md border-2 border-sky-500 hover:bg-sky-500 text-gray-100">Save</button>
                </div>
                {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
            </form>
        </div>
    );
}