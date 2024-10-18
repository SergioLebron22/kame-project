import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeSearchBar from "./EmployeeSearchBar";
import NavBar from "./NavBar";

export default function EmployeesList() {
    const [employeeList, setEmployeeList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/dashboard/users/')
            .then(response => {
                console.log(response.data);
                setEmployeeList(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching employees!", error)
            });
    }, [])

    const handleQuery = (query) => {
        setSearchQuery(query);
    }

    const handleEmployeeClick = (employee_id) => {
        localStorage.setItem('employee_id', employee_id);
        navigate('/dashboard/');
    }

    const handleEditClick = (employee_id) => {
        localStorage.setItem('employee_id', employee_id);
        navigate(`/edit-employee/${employee_id}`)
    }

    const filteredemployees = employeeList.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gray-200 min-h-full justify-between">
            <NavBar />
            <h1 className="flex align-center justify-start font-bold my-10 ml-24 text-gray-800 text-4xl">Employees List</h1>
            <div className="flex justify-start ml-20">
                <EmployeeSearchBar onSearch={handleQuery}/>
            </div>
            <div className="mx-20 mt-3 p-5 bg-white min-h-screen rounded-lg border-2 border-gray-300 shadow-xl">
                <ul role="list" className="divide-y divide-gray-400">
                    {filteredemployees.map((employee) => (
                        <li key={employee.employee_id} className="flex justify-between gap-x-6 py-5 border-b-2" >
                            <div className="min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto p-3">
                                    <p onClick={() => handleEmployeeClick(employee.employee_id)} className="text-sm font-semibold leading-6 text-gray-900">{employee.name}</p>
                                    <p className="leading-5 text-xs text-gray-600">Role: {employee.role}</p>
                                </div>
                            </div>
                            <div>
                                <button className="mt-3 mr-5 px-3 py-2 border-b-2 rounded-md text-sm hover:bg-sky-400  hover:text-white" onClick={() => handleEditClick(employee.employee_id)}>Edit</button>
                                <button className="mt-3 mr-5 px-3 py-2 border-b-2 rounded-md text-sm hover:bg-sky-400  hover:text-white">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="text-gray-200">.</div>
        </div>
    );
}
