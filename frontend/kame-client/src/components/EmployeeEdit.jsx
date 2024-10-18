import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditEmployees = () => {
    const { employee_id } = useParams();
    const [employee, setEmployee] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/dashboard/users/:employee_id/update/`)
            .then(response => {
                setEmployee(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the employee details!", error);
            });
    }, [employee_id]);

    if (!employee) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Edit Employee</h1>
            <form>
                <label>
                    Name:
                    <input type="text" id="name" name="name" value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />
                </label>
                {/* Add other fields as needed */}
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditEmployees;
