/* eslint-disable no-unused-vars */
import { useState } from 'react';
import api from '../api';

const EditEmployees = () => {
    const employee_id = localStorage.getItem('employee_id')
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [employee, setEmployee] = useState(null);

    const roleOptions = [
        { value: 'admin', label: 'Supervisor' },
        { value: 'doctor', label: 'Doctor' },
        { value: 'nurse', label: 'Nurse' }
    ];

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
            const response = await api.get(`dashboard/users/${employee_id}/`);
            setEmployee(response.data)
            console.log(employee)
            if (response.data) {
                await api.put(`dashboard/users/${employee_id}/update/`, new_employee);
                console.log('Employee updated successfully');
                window.location.href = '/dashboard'
            }
        } catch (error) {
            console.error("there was an error updating employee", error);
            }
        }

    return (
        <div className='bg-white mx-20 mt-20 md:mx-80 p-16 rounded-lg shadow-2xl'>
            <h1 className='text-2xl font-bold mb-4 ml-40'>Edit Employee</h1>
            <form onSubmit={handleSubmit} className='space-y-4 mx-40'>
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
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="">Select a Role</option>
                        {roleOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
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
                        className='w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEmployees;
