import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const BarDisease = () => {
    const [barData, setBarData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Total Patients Per Month',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedICD10, setSelectedICD10] = useState('A001');
    const [icd10Options, setIcd10Options] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [icd10Description, setIcd10Description] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch ICD-10 codes from the backend
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

    // Fetch dashboard data and group by icd10_added_date per month
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/dashboard/')
          .then(response => {
            console.log('Dashboard Data:', response.data);

            // Filter data by selected ICD-10 code
            const filteredData = response.data.filter(
              record => record.code.code.toLowerCase() === selectedICD10.toLowerCase()
            );

            console.log('Filtered Data:', filteredData);

            // Group patients by month using icd10_added_date
            const patientsPerMonth = {};
            filteredData.forEach(record => {
                const date = new Date(record.icd10_added_date);  // Use icd10_added_date
                const month = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();

                if (patientsPerMonth[month]) {
                    patientsPerMonth[month]++;
                } else {
                    patientsPerMonth[month] = 1;
                }
            });

            // Prepare data for the chart
            const labels = Object.keys(patientsPerMonth).sort((a, b) => new Date(a) - new Date(b));  // Sort by date
            const data = labels.map(label => patientsPerMonth[label]);

            // Update chart data using setBarData
            setBarData({
                labels,
                datasets: [
                    {
                        label: `Total Patients for ICD-10: ${selectedICD10}`,
                        data,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                ],
            });
          })
          .catch(error => console.error('Error fetching dashboard data:', error));
      }, [selectedICD10]);

    // Handle search input changes
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const filtered = icd10Options.filter(option =>
            option.description.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredOptions(filtered);
    };

    // Handle ICD-10 code selection
    const handleCodeSelect = (code) => {
        console.log('Selected ICD-10 Code:', code);
        setSelectedICD10(code);
        const selectedOption = icd10Options.find(option => option.code === code);
        setIcd10Description(selectedOption ? selectedOption.description : '');
        setSearchTerm('');
        setFilteredOptions(icd10Options);
    };

    return (
        <div className="w-full h-full p-4">
            <h2 className="text-xl font-bold mb-4">Diseases</h2>
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
                        <li
                            key={option.code}
                            onClick={() => handleCodeSelect(option.code)}
                            className="cursor-pointer hover:bg-gray-100 p-2"
                        >
                            {option.code} - {option.description}
                        </li>
                    ))}
                </ul>
            )}
            {icd10Description && <p className="mb-4">{icd10Description}</p>}

            <div className="w-full h-[400px] bg-white shadow-md rounded p-4">
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
        </div>
    );
};

export default BarDisease;
