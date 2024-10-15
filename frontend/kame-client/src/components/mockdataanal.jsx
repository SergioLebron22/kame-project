import React, {useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';

const DataAnalysis = () => {
    const [barData, setBarData] = useState(null);
    const [pieData, setPieData] = useState(null);
    const [lineData, setLineData] = useState(null);

    useEffect(() => {
        axios.get('/api/dashboard/')
            .then(response => {
                const data = response.data;

                const icd10Code = 'A001';
                const filteredData = data.filter(record => record.code_id === icd10Code);

                const groupedData = filteredData.reduce((acc, record) => {
                    const month = new Date(record.date). toLocaleString('default', { month: 'long' });
                    if (!acc[month]) {
                        acc[month] = 0;
                    }
                    acc[month]++;
                    return acc;
                }, {});

                const labels = Object.keys(groupedData);
                const counts = Object.values(groupedData);

                setBarData({
                    labels: labels,
                    datasets: [
                        {
                            label: `Patients Diagnosed with ${icd10code}`,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            data: counts,
                        },
                    ],
                });
            });
    }, []);

    useEffect(() => {
        axios.get('/api/dashboard/patients_dashboard/')
            .then(response => {
                const data = response.data;

                const ageRanges = {
                    '0-10': 0,
                    '11-20': 0,
                    '21-30': 0,
                    '31-40': 0,
                    '41-50': 0,
                    '51-60': 0,
                    '61-70': 0,
                    '71-80': 0,
                    '81+': 0,
                };

                data.forEach(patient => {
                    const age = patient.age;
                    if (age <= 10) ageRanges['0-10']++;
                    else if (age <= 20) ageRanges['11-20']++;
                    else if (age <= 30) ageRanges['21-30']++;
                    else if (age <= 40) ageRanges['31-40']++;
                    else if (age <= 50) ageRanges['41-50']++;
                    else if (age <= 60) ageRanges['51-60']++;
                    else if (age <= 70) ageRanges['61-70']++;
                    else if (age <= 80) ageRanges['71-80']++;
                    else ageRanges['81+']++;
                });

                const labels = Object.keys(ageRanges);
                const counts = Object.values(ageRanges);

                setPieData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Patients by Age Range',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(199, 199, 199, 0.2)',
                                'rgba(83, 102, 255, 0.2)',
                                'rgba(255, 159, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(199, 199, 199, 1)',
                                'rgba(83, 102, 255, 1)',
                                'rgba(255, 159, 255, 1)',
                            ],
                            borderWidth: 1,
                            data: counts,
                        },
                    ],
                });
            });
    }, []);

    useEffect(() => {
        axios.get('/api/dashboard/patients_dashboard/')
            .then(response => {
                const data = response.data;

                const today = new Date().toISOString().split('T')[0];
                const todaysVisits = data.filter(record => record.date.startsWith(today));

                const lineLabels = todaysVisits.map(record => new Date(record.date).toLocaleTimeString());
                const lineCounts = todaysVisits.map(() => 1);

                setLineData({
                    labels: lineLabels,
                    datasets: [
                        {
                            label: 'Patients Visiting Today',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                            data: lineCounts,
                        },
                    ],
                });
    }, []);

    return (
        <div className="flex flex-col space-y-4">
            <div className="w-full h-96 p-4 border">
                {barData && <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />}
            </div>
            <div className="flex w-full space-x-4">
                <div className="w-1/2 h-96 p-4 border">
                    {pieData && <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />}
                </div>
                <div className="w-1/2 h-96 p-4 border">
                    {lineData && <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />}
                </div>
            </div>
        </div>
    );
};

export default DataAnalysis;
