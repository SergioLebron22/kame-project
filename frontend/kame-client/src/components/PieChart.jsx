import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    registerables
} from 'chart.js';

ChartJS.register(...registerables);

const PiePatientAge = () => {
    const [pieData, setPieData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Patient Age Distribution',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/dashboard/patients_dashboard/')
            .then(response => {
                const data = response.data;

                // Process data to get age distribution
                const ageGroups = {
                    '0-10': 0,
                    '11-20': 0,
                    '21-30': 0,
                    '31-40': 0,
                    '41-50': 0,
                    '51+': 0,
                };

                data.forEach(record => {
                    const age = record.age;
                    if (age <= 10) ageGroups['0-10']++;
                    else if (age <= 20) ageGroups['11-20']++;
                    else if (age <= 30) ageGroups['21-30']++;
                    else if (age <= 40) ageGroups['31-40']++;
                    else if (age <= 50) ageGroups['41-50']++;
                    else ageGroups['51+']++;
                });

                const labels = Object.keys(ageGroups);
                const counts = Object.values(ageGroups);

                setPieData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Patient Age Distribution',
                            data: counts,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-[90%] h-[90%]"> {/* Expanded size */}
                <Pie
                    data={pieData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false, // Allows filling the parent container
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    boxWidth: 20, // Adjust legend box size
                                },
                            },
                            title: {
                                display: true,
                                text: 'Patient Age Distribution',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default PiePatientAge;
