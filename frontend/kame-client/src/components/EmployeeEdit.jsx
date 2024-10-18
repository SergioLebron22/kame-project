/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditEmployees = () => {
    const employee_id = localStorage.getItem('employee_id')
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [employee, setEmployee] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const new_employee = {
            employee_id: employee_id,
            role: role,
            email: email,
            password: password,
            name: name,
        }

        try{
            const response = await axios.get(`http://127.0.0.1:8000/dashboard/users/${employee_id}/`);
            setEmployee(response.data)
            console.log(employee)
            if (response.data) {
                await axios.put(`http://127.0.0.1:8000/dashboard/users/${employee_id}/update/`, new_employee);
                console.log('Employee updated successfully');
                window.location.href = '/dashboard'
            }
        } catch (error) {
            console.error("there was an error updating employee", error);
            }
        }

    return (
        <div className='bg-gray-100 p-6 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-4'>Edit Employee</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Name:
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </label>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Role:
                        <input
                            required
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </label>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Email:
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </label>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Password:
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </label>
                </div>
                <div>
                    <button
                        type="submit"
                        className='w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEmployees;
