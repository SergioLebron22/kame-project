/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const BarDisease = () => {
    const [barData, setBarData] = useState({ labels: [], datasets: [{ label: 'Disease Data', data: [], backgroundColor: 'rgba(75, 192, 192, 0.6)' }] });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedICD10, setSelectedICD10] = useState('A001');
    const [icd10Options, setIcd10Options] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [icd10Description, setIcd10Description] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/home/get_codes/', {
            params: { query: searchTerm, page: currentPage, page_size: 10 },
        })
        .then(response => {
            setIcd10Options(response.data.codes);
            setFilteredOptions(response.data.codes);
        })
        .catch(error => console.error('Error fetching ICD-10 codes:', error));
    }, [searchTerm, currentPage]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/dashboard/')
        .then(response => {
            const filteredData = response.data.filter(record => record.code_id === selectedICD10);
            const groupedData = filteredData.reduce((acc, record) => {
                const month = new Date(record.date).toLocaleString('default', { month: 'long' });
                acc[month] = (acc[month] || 0) + 1;
                return acc;
            }, {});
            setBarData({
                labels: Object.keys(groupedData),
                datasets: [{ label: `Patients Diagnosed with ${selectedICD10}`, data: Object.values(groupedData), backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 1 }]
            });
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [selectedICD10]);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const filtered = icd10Options.filter(option =>
            option.description.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredOptions(filtered);
    };

    const handleCodeSelect = (code) => {
        setSelectedICD10(code);
        const selectedOption = icd10Options.find(option => option.code === code);
        setIcd10Description(selectedOption ? selectedOption.description : '');
        setSearchTerm('');
        setFilteredOptions(icd10Options);
    };

    return (
        <div className="w-full h-48 p-4">
            <input
                type="text"
                placeholder="Search by description..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="border p-2 mb-2 w-1/3"
            />
            {filteredOptions.length > 0 && searchTerm && (
                <ul className="bg-white border border-gray-300 rounded shadow-md mb-2">
                {filteredOptions.map(option => (
                    <li key={option.code} onClick={() => handleCodeSelect(option.code)} className="cursor-pointer hover:bg-gray-100 p-2">
                        {option.code} - {option.description}
                    </li>
                    ))}
                </ul>
            )}
            {icd10Description && <p>{icd10Description}</p>}

            <Bar
                data={barData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top' },
                    },
                }}
            />
        </div>
    );
};

export default BarDisease;
