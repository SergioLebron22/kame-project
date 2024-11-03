/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import EmployeeSearchBar from "./EmployeeSearchBar";
import NavBar from "./NavBar";
import BackButton from "./BackButton";

export default function EmployeesList() {
    const [employeeList, setEmployeeList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [employees, setEmployees] = useState(employeeList);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('dashboard/users/')
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

    const handleEditClick = (employee_id) => {
        localStorage.setItem('employee_id', employee_id);
        navigate(`/edit-employee/${employee_id}`)
    }

    const handleDeleteClick = (employee_id) => {
        setSelectedEmployeeId(employee_id);
        setShowPopup(true);
    };

    const handleConfirmDelete = () => {
        if (!selectedEmployeeId) {
            console.error('Employee ID is undefined');
            return;
        }

        setShowPopup(false);
        setShowSuccess(true);

        api.delete(`dashboard/users/${selectedEmployeeId}/delete/`)
            .then(response => {
                console.log('Employee deleted successfully:', response.data);
                setShowSuccess(true);
                window.location.reload();
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
                setShowSuccess(false);
            });
    };

    const handleCancelDelete = () => {
        setShowPopup(false);
        setSelectedEmployeeId(null);
    };

    const filteredemployees = employeeList.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gradient-to-b from-gray-100 via-gray-100 to-sky-500 min-h-full justify-between">
            <NavBar />
            <BackButton />
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
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{employee.name}</p>
                                    <p className="leading-5 text-xs text-gray-600">Role: {employee.role}</p>
                                </div>
                            </div>
                            <div>
                                <button className="mt-3 mr-5 px-3 py-2 border-b-2 rounded-md text-sm hover:bg-sky-400  hover:text-white" onClick={() => handleEditClick(employee.employee_id)}>Edit</button>
                                <button className="mt-3 mr-5 px-3 py-2 border-b-2 rounded-md text-sm hover:bg-sky-400  hover:text-white" onClick={() => handleDeleteClick(employee.employee_id)}>
                                    Delete
                                </button>
                                {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <p>Are you sure you want to delete this employee?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                onClick={handleConfirmDelete}
                            >
                                Yes
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                                onClick={handleCancelDelete}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccess && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-md">
                    Employee deleted successfully!
                </div>
            )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="text-gray-200">.</div>
        </div>
    );
}
